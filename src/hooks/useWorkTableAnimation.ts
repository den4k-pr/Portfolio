import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { selectStringValue } from "../store/slices/chooseCategory";
import { tableListType } from "../components/types/tableListType";
import { tableWork } from "../templates/tableWork";

export const useWorkTableAnimation = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const stringValue = useSelector((state: RootState) => selectStringValue(state));

    // Скидання hasInteracted при оновленні stringValue
    useEffect(() => {
        setHasInteracted(false);
        startTimeRef.current = null; // перезапуск анімації
    }, [stringValue]);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };

        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);

        const scrollElement = scrollRef.current;

        if (!scrollElement || hasInteracted) return;

        const duration = 50000;
        const maxScrollTop = scrollElement.scrollHeight - scrollElement.clientHeight;

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;

            let progress = (elapsed % duration) / duration;
            if (progress > 0.5) progress = 1 - progress;
            const scrollTop = maxScrollTop * (progress * 2);

            scrollElement.scrollTop = scrollTop;

            if (!isHovered && !hasInteracted) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        const stopAnimation = () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            setHasInteracted(true);
        };

        scrollElement.addEventListener("touchstart", stopAnimation);
        scrollElement.addEventListener("mousedown", stopAnimation);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            scrollElement.removeEventListener("touchstart", stopAnimation);
            scrollElement.removeEventListener("mousedown", stopAnimation);
            window.removeEventListener("resize", checkIsMobile);
        };
    }, [isHovered, hasInteracted, stringValue]);

    const handleMouseEnter = () => {
        if (!hasInteracted) {
            setIsHovered(true);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            setHasInteracted(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const filterItems = (items: tableListType[], stringValue: string) => {
        const filteredItems = items.filter((item) => item.category.includes(stringValue));
        return filteredItems.length > 0 ? filteredItems : items;
    };

    const result = filterItems(tableWork, stringValue);

    return { scrollRef, handleMouseEnter, handleMouseLeave, result };
};
