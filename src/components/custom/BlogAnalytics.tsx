'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { BlogPost } from '@/data/blogData';

interface BlogAnalyticsProps {
  post: BlogPost;
}

interface EngagementData {
  timeOnPage: number;
  scrollDepth: number;
  readingProgress: number;
  interactions: string[];
  timestamp: number;
}

const BlogAnalytics: React.FC<BlogAnalyticsProps> = ({ post }) => {
  const [startTime] = useState(Date.now());
  const [engagementData, setEngagementData] = useState<EngagementData>({
    timeOnPage: 0,
    scrollDepth: 0,
    readingProgress: 0,
    interactions: [],
    timestamp: startTime
  });

  // Track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      setEngagementData(prev => ({
        ...prev,
        timeOnPage: Date.now() - startTime
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  // Track scroll depth and reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = Math.min((scrollTop / docHeight) * 100, 100);
      
      setEngagementData(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollDepth),
        readingProgress: scrollDepth
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track interactions
  const trackInteraction = useCallback((interaction: string) => {
    setEngagementData(prev => ({
      ...prev,
      interactions: [...prev.interactions, `${interaction}:${Date.now() - startTime}`]
    }));
  }, [startTime]);

  // Track social shares
  useEffect(() => {
    const handleShare = () => trackInteraction('share_click');
    const shareButtons = document.querySelectorAll('[data-analytics="share"]');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', handleShare);
    });

    return () => {
      shareButtons.forEach(button => {
        button.removeEventListener('click', handleShare);
      });
    };
  }, [trackInteraction]);

  // Send analytics data on page unload
  useEffect(() => {
    const sendAnalytics = () => {
      const finalData = {
        ...engagementData,
        timeOnPage: Date.now() - startTime,
        postSlug: post.slug,
        postCategory: post.category,
        postTitle: post.title
      };
 
      // In a real implementation, you would send this to your analytics service
      // For now, we'll just log it to console
      console.log('📊 Blog Analytics:', finalData);
      
      // Example of how you might send to analytics
      /*
      try {
        navigator.sendBeacon('/api/analytics', JSON.stringify(finalData));
      } catch (error) {
        console.error('Failed to send analytics:', error);
      }
      */
    };

    const handleBeforeUnload = () => sendAnalytics();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendAnalytics();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [engagementData, post, startTime]);

  // Track reading milestones
  useEffect(() => {
    const milestones = [25, 50, 75, 90, 100];
    
    milestones.forEach(milestone => {
      if (engagementData.readingProgress >= milestone && 
          !engagementData.interactions.some(i => i.startsWith(`milestone_${milestone}`))) {
        trackInteraction(`milestone_${milestone}`);
      }
    });
  }, [engagementData.readingProgress, engagementData.interactions, trackInteraction]);

  // This component doesn't render anything visible
  // It's purely for analytics tracking
  return null;
};

export default BlogAnalytics; 