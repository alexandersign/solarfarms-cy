import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-10-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Groq queries
export const queries = {
  // Blog posts
  allPosts: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    categories,
    author->{
      name,
      photo
    }
  }`,
  
  postBySlug: `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    content,
    publishedAt,
    categories,
    tags,
    author->{
      name,
      photo,
      bio
    },
    seo
  }`,
  
  featuredPosts: `*[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    categories,
    author->{
      name,
      photo
    }
  }`,

  // Projects
  allProjects: `*[_type == "project"] | order(capacity desc) {
    _id,
    title,
    slug,
    description,
    featuredImage,
    location,
    capacity,
    investment,
    timeline,
    featured
  }`,
  
  projectBySlug: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    featuredImage,
    gallery,
    location,
    capacity,
    investment,
    timeline,
    technicalSpecs,
    content,
    testimonial->{
      quote,
      clientName,
      clientTitle,
      company,
      rating
    }
  }`,
  
  featuredProjects: `*[_type == "project" && featured == true] | order(capacity desc)[0...3] {
    _id,
    title,
    slug,
    description,
    featuredImage,
    location,
    capacity,
    investment,
    timeline
  }`,

  // Services
  allServices: `*[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    category,
    features,
    featured,
    order
  }`,
  
  serviceBySlug: `*[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    icon,
    featuredImage,
    category,
    features,
    benefits,
    process,
    pricing,
    content,
    relatedProjects[]->
  }`,

  // Team members
  allTeamMembers: `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    slug,
    position,
    bio,
    photo,
    expertise,
    featured,
    order
  }`,
  
  featuredTeamMembers: `*[_type == "teamMember" && featured == true] | order(order asc) {
    _id,
    name,
    position,
    bio,
    photo,
    expertise
  }`,

  // Testimonials
  allTestimonials: `*[_type == "testimonial"] | order(rating desc, publishedAt desc) {
    _id,
    quote,
    clientName,
    clientTitle,
    company,
    clientPhoto,
    companyLogo,
    projectDetails,
    rating,
    category,
    featured
  }`,
  
  featuredTestimonials: `*[_type == "testimonial" && featured == true] | order(rating desc)[0...3] {
    _id,
    quote,
    clientName,
    clientTitle,
    company,
    clientPhoto,
    companyLogo,
    rating,
    projectDetails
  }`,

  // Investment guides
  allGuides: `*[_type == "investmentGuide"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    category,
    targetAudience,
    keyTakeaways,
    featured,
    gatedContent,
    publishedAt
  }`,
  
  guideBySlug: `*[_type == "investmentGuide" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    coverImage,
    category,
    targetAudience,
    downloadFile,
    keyTakeaways,
    content,
    relatedGuides[]->
  }`,
  
  featuredGuides: `*[_type == "investmentGuide" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    description,
    coverImage,
    category,
    keyTakeaways
  }`,

  // Site settings
  siteSettings: `*[_type == "siteSettings"][0] {
    title,
    description,
    keywords,
    logo,
    favicon,
    contact,
    social,
    analytics,
    homepage,
    maintenance
  }`,
}

// Helper functions for fetching data
export async function getAllPosts() {
  return await client.fetch(queries.allPosts)
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(queries.postBySlug, { slug })
}

export async function getFeaturedPosts() {
  return await client.fetch(queries.featuredPosts)
}

export async function getAllProjects() {
  return await client.fetch(queries.allProjects)
}

export async function getProjectBySlug(slug: string) {
  return await client.fetch(queries.projectBySlug, { slug })
}

export async function getFeaturedProjects() {
  return await client.fetch(queries.featuredProjects)
}

export async function getAllServices() {
  return await client.fetch(queries.allServices)
}

export async function getServiceBySlug(slug: string) {
  return await client.fetch(queries.serviceBySlug, { slug })
}

export async function getAllTeamMembers() {
  return await client.fetch(queries.allTeamMembers)
}

export async function getFeaturedTeamMembers() {
  return await client.fetch(queries.featuredTeamMembers)
}

export async function getAllTestimonials() {
  return await client.fetch(queries.allTestimonials)
}

export async function getFeaturedTestimonials() {
  return await client.fetch(queries.featuredTestimonials)
}

export async function getAllGuides() {
  return await client.fetch(queries.allGuides)
}

export async function getGuideBySlug(slug: string) {
  return await client.fetch(queries.guideBySlug, { slug })
}

export async function getFeaturedGuides() {
  return await client.fetch(queries.featuredGuides)
}

export async function getSiteSettings() {
  return await client.fetch(queries.siteSettings)
}
