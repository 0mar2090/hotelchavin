"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
}

// Shared observer cache: one IntersectionObserver per unique
// (threshold + rootMargin) combination, instead of one per hook call.
// This reduces browser overhead from ~12 observers to ~1-2.
const observerMap = new Map<string, IntersectionObserver>();
const callbackMap = new Map<Element, (isIntersecting: boolean) => void>();

function getSharedObserver(threshold: number, rootMargin: string): IntersectionObserver {
    const key = `${threshold}|${rootMargin}`;
    let observer = observerMap.get(key);

    if (!observer) {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const cb = callbackMap.get(entry.target);
                    if (cb) cb(entry.isIntersecting);
                });
            },
            { threshold, rootMargin }
        );
        observerMap.set(key, observer);
    }

    return observer;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
    options: ScrollRevealOptions = {}
) {
    const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleIntersection = useCallback(
        (isIntersecting: boolean) => {
            if (isIntersecting) {
                setIsVisible(true);
                if (once && ref.current) {
                    const observer = getSharedObserver(threshold, rootMargin);
                    observer.unobserve(ref.current);
                    callbackMap.delete(ref.current);
                }
            } else if (!once) {
                setIsVisible(false);
            }
        },
        [once, threshold, rootMargin]
    );

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = getSharedObserver(threshold, rootMargin);
        callbackMap.set(el, handleIntersection);
        observer.observe(el);

        return () => {
            observer.unobserve(el);
            callbackMap.delete(el);
        };
    }, [threshold, rootMargin, handleIntersection]);

    return { ref, isVisible };
}

export function useAnimatedCounter(
    end: number,
    isVisible: boolean,
    duration: number = 2000
) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isVisible || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now();
        let frameId: number;

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
                frameId = requestAnimationFrame(step);
            } else {
                setCount(end);
            }
        };

        frameId = requestAnimationFrame(step);

        // Cleanup: cancel animation if component unmounts during animation
        return () => {
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [isVisible, end, duration]);

    return count;
}
