
import fs from 'fs';

const filePath = '/data/movies.ts';
const content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
const movieLines = [];
let header = [];
let footer = [];
let inArray = false;

for (const line of lines) {
  if (line.includes('export const movieData: Movie[] = [')) {
    inArray = true;
    header.push(line);
    continue;
  }
  if (inArray && line.trim() === '];') {
    inArray = false;
    footer.push(line);
    continue;
  }
  if (inArray) {
    if (line.trim().startsWith('createMovie')) {
      movieLines.push(line);
    }
  } else {
    if (footer.length > 0) {
      footer.push(line);
    } else {
      header.push(line);
    }
  }
}

const seenLinks = new Set();
const uniqueMovies = [];

for (const line of movieLines) {
  // Extract the link (6th argument)
  // createMovie('ID', 'Title', 'Year', 'Actors', 'Synopsis', 'LINK', ...
  const match = line.match(/createMovie\s*\(\s*'[^']*'\s*,\s*'[^']*'\s*,\s*'[^']*'\s*,\s*'[^']*'\s*,\s*'[^']*'\s*,\s*'([^']*)'/);
  if (match) {
    const link = match[1];
    if (!seenLinks.has(link)) {
      seenLinks.add(link);
      uniqueMovies.push(line);
    }
  }
}

// Re-index
const reindexedMovies = uniqueMovies.map((line, index) => {
  const newId = (index + 1).toString();
  return line.replace(/createMovie\s*\(\s*'[^']*'/, `createMovie('${newId}'`);
});

const newContent = header.join('\n') + '\n' + reindexedMovies.join('\n') + '\n' + footer.join('\n');
fs.writeFileSync('/data/movies_fixed.ts', newContent);
console.log(`Original count: ${movieLines.length}`);
console.log(`Unique count: ${reindexedMovies.length}`);
