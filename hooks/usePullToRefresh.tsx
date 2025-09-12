'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void>;
  pullThreshold?: number;
  maxPullDistance?: number;
  refreshThreshold?: number;
}

export const usePullToRefresh = ({
  onRefresh,
  pullThreshold = 60,
  maxPullDistance = 120,
  refreshThreshold = 80
}: UsePullToRefreshOptions) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [canPull, setCanPull] = useState(false);
  
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if we can start pulling (at top of scroll)
  const checkCanPull = useCallback(() => {
    if (containerRef.current) {
      const isAtTop = containerRef.current.scrollTop <= 0;
      setCanPull(isAtTop);
      return isAtTop;
    }
    return false;
  }, []);

  // Handle touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!checkCanPull() || isRefreshing) return;
    
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
    isDragging.current = false;
  }, [checkCanPull, isRefreshing]);

  // Handle touch move
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!canPull || isRefreshing) return;

    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;

    if (deltaY > 0) {
      isDragging.current = true;
      e.preventDefault(); // Prevent scroll
      
      // Calculate pull distance with diminishing returns
      const distance = Math.min(
        deltaY * 0.5, // Damping factor
        maxPullDistance
      );
      
      setPullDistance(distance);
    }
  }, [canPull, isRefreshing, maxPullDistance]);

  // Handle touch end
  const handleTouchEnd = useCallback(async () => {
    if (!isDragging.current || isRefreshing) {
      setPullDistance(0);
      return;
    }

    isDragging.current = false;

    if (pullDistance >= refreshThreshold) {
      setIsRefreshing(true);
      
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
  }, [pullDistance, refreshThreshold, onRefresh, isRefreshing]);

  // Setup event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add passive: false to prevent default scroll behavior when pulling
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('scroll', checkCanPull, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('scroll', checkCanPull);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, checkCanPull]);

  // Calculate progress percentage
  const progress = Math.min((pullDistance / refreshThreshold) * 100, 100);
  const shouldRefresh = pullDistance >= refreshThreshold;

  return {
    containerRef,
    isRefreshing,
    pullDistance,
    progress,
    shouldRefresh,
    canPull
  };
};
