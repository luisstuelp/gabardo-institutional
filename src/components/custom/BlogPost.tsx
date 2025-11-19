'use client';

import React, { useRef } from 'react';
import type { JSX } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Eye, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SocialShare from '@/components/custom/SocialShare';
import ReadingProgress from '@/components/custom/ReadingProgress';
import BlogAnalytics from '@/components/custom/BlogAnalytics';
import { useTrackView } from '@/hooks/useTrackView';
import type { BlogPostDetail, BlogContentBlock } from '@/types/blog';

interface BlogPostProps {
  post: BlogPostDetail;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  // Track view of this post
  useTrackView({ contentType: 'post', contentId: post.id });
  
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const renderContent = (content: BlogContentBlock, index: number) => {
    const variants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: index * 0.1 }
      }
    };

    switch (content.type) {
      case 'paragraph':
        return (
          <motion.p
            key={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg md:text-xl leading-relaxed text-white/80 mb-8 max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        );

      case 'heading':
        const HeadingTag = `h${content.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <motion.div
            key={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="my-12 max-w-4xl mx-auto"
          >
            <HeadingTag className={`
              font-bold text-white leading-tight
              ${content.level === 2 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}
            `}>
              {content.content}
            </HeadingTag>
            <motion.div 
              className="w-16 h-1 bg-white/30 mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
        );

      case 'quote':
        return (
          <motion.blockquote
            key={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="my-16 max-w-5xl mx-auto"
          >
            <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="absolute top-6 left-6 text-6xl text-white/20 font-serif">&ldquo;</div>
              <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-6 pl-12">
                {content.content}
              </p>
              {content.author && (
                <cite className="text-white/60 text-lg not-italic pl-12">
                  — {content.author}
                </cite>
              )}
            </div>
          </motion.blockquote>
        );

      case 'image':
        return (
          <motion.figure
            key={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="my-16 max-w-6xl mx-auto"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src={content.content}
                alt={content.alt || ''}
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            {content.alt && (
              <figcaption className="text-center text-white/60 mt-4 italic">
                {content.alt}
              </figcaption>
            )}
          </motion.figure>
        );

      case 'list':
        const ListTag = content.ordered ? 'ol' : 'ul';
        return (
          <motion.div
            key={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="my-12 max-w-4xl mx-auto"
          >
            {content.content && (
              <p className="text-xl font-medium text-white mb-6">{content.content}</p>
            )}
            <ListTag className={`space-y-4 ${content.ordered ? 'list-decimal list-inside' : ''}`}>
              {content.items?.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                  className={`flex items-start space-x-4 text-lg text-white/80 ${content.ordered ? 'ml-0' : ''}`}
                >
                  {!content.ordered && <div className="w-2 h-2 bg-white/60 rounded-full mt-3 flex-shrink-0" />}
                  <span className={content.ordered ? 'ml-2' : ''}>{item}</span>
                </motion.li>
              ))}
            </ListTag>
          </motion.div>
        );

      case 'highlight':
        return (
          <motion.div
            key={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="my-16 max-w-5xl mx-auto"
          >
            <div className="relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
              </div>
              <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                {content.content}
              </p>
            </div>
          </motion.div>
        );

      case 'video':
        return (
          <motion.figure
            key={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="my-16 w-full max-w-3xl mx-auto md:max-w-4xl"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              <video
                className="h-full w-full"
                src={content.content}
                poster={content.poster}
                autoPlay={content.autoplay}
                loop={content.loop}
                muted={content.muted ?? content.autoplay ?? false}
                controls={content.controls ?? true}
                playsInline
              />
            </div>
            {content.caption && (
              <figcaption className="text-center text-white/60 mt-4 text-sm italic">
                <span>{content.caption}</span>
                {content.linkUrl && (
                  <div className="mt-2">
                    <a
                      href={content.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gabardo-light-blue hover:text-gabardo-light-blue/80 font-medium"
                    >
                      {content.linkLabel ?? 'Acesse o certificado'}
                    </a>
                  </div>
                )}
              </figcaption>
            )}
          </motion.figure>
        );

      case 'divider':
        return (
          <motion.div
            key={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="my-16 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-px bg-white/30" />
              <div className="w-2 h-2 bg-white/40 rounded-full" />
              <div className="w-16 h-px bg-white/30" />
            </div>
          </motion.div>
        );

      case 'html':
        return (
          <motion.div
            key={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="my-12 w-full max-w-5xl mx-auto"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Header variant="dark" />
      
      {/* Reading Progress */}
      <ReadingProgress readTime={post.readTime} />

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-white/2 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-white/2 to-transparent" />
      </div>

      <main className="relative z-10 pt-24 md:pt-32">
        
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 md:px-8 lg:px-16 mb-8"
        >
          <Link 
            href="/blog"
            className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Voltar ao Blog</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ opacity: headerOpacity }}
          className="container mx-auto px-4 md:px-8 lg:px-16 mb-16"
        >
          
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">
              <Tag className="w-4 h-4" />
              <span>{post.category}</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            style={{ scale: titleScale }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-center mb-8 max-w-6xl mx-auto"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 text-center max-w-4xl mx-auto leading-relaxed mb-12"
          >
            {post.excerpt}
          </motion.p>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 text-white/60 mb-12"
          >
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Leitura imersiva</span>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {post.tags.map(tag => (
              <span
                key={tag}
                className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-3xl overflow-hidden max-w-6xl mx-auto mb-16"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </motion.header>

        {/* Article Content */}
        <motion.article
          ref={contentRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="container mx-auto px-4 md:px-8 lg:px-16 mb-20"
        >
          <div className="max-w-none">
            {post.content.map((content, index) => renderContent(content, index))}
          </div>
        </motion.article>

        {/* Share Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 md:px-8 lg:px-16 mb-20"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">Compartilhe este artigo</h3>
            <div className="flex justify-center">
              <SocialShare post={post} />
            </div>
          </div>
        </motion.section>

        {/* Related Posts - TODO: Re-implement with Supabase query */}
      </main>

      <Footer />

      {/* Analytics Tracking */}
      <BlogAnalytics post={post} />
    </div>
  );
};

export default BlogPost; 