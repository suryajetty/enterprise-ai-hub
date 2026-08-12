import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export function getAllArticles(): ArticleMeta[] {
  const articlesDirectory = path.join(process.cwd(), 'app/articles');
  
  // Get all folders inside app/articles
  const folders = fs.readdirSync(articlesDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const articles = folders.map((slug) => {
    const fullPath = path.join(articlesDirectory, slug, 'page.mdx');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the frontmatter metadata
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
    };
  });

  // Sort articles by date (newest first)
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}