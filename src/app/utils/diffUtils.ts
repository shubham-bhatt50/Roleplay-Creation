/**
 * Simple diff utility to compare two HTML strings and generate a visual diff
 */

type DiffSegment = {
  type: 'unchanged' | 'added' | 'removed';
  text: string;
};

/**
 * Strips HTML tags from a string to compare plain text
 */
function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

/**
 * Splits text into words while preserving whitespace
 */
function tokenize(text: string): string[] {
  return text.split(/(\s+)/).filter(token => token.length > 0);
}

/**
 * Computes the longest common subsequence between two arrays
 */
function lcs(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find LCS
  const result: string[] = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.unshift(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return result;
}

/**
 * Generates diff segments between original and modified text
 */
export function generateDiff(original: string, modified: string): DiffSegment[] {
  const originalText = stripHtml(original);
  const modifiedText = stripHtml(modified);
  
  const originalTokens = tokenize(originalText);
  const modifiedTokens = tokenize(modifiedText);
  
  const commonTokens = lcs(originalTokens, modifiedTokens);
  
  const segments: DiffSegment[] = [];
  let oi = 0, mi = 0, ci = 0;
  
  while (oi < originalTokens.length || mi < modifiedTokens.length) {
    // Find removed tokens (in original but not in common)
    const removedTokens: string[] = [];
    while (oi < originalTokens.length && (ci >= commonTokens.length || originalTokens[oi] !== commonTokens[ci])) {
      removedTokens.push(originalTokens[oi]);
      oi++;
    }
    if (removedTokens.length > 0) {
      segments.push({ type: 'removed', text: removedTokens.join('') });
    }
    
    // Find added tokens (in modified but not in common)
    const addedTokens: string[] = [];
    while (mi < modifiedTokens.length && (ci >= commonTokens.length || modifiedTokens[mi] !== commonTokens[ci])) {
      addedTokens.push(modifiedTokens[mi]);
      mi++;
    }
    if (addedTokens.length > 0) {
      segments.push({ type: 'added', text: addedTokens.join('') });
    }
    
    // Add common token
    if (ci < commonTokens.length) {
      // Collect consecutive unchanged tokens
      const unchangedTokens: string[] = [];
      while (ci < commonTokens.length && 
             oi < originalTokens.length && 
             mi < modifiedTokens.length && 
             originalTokens[oi] === commonTokens[ci] && 
             modifiedTokens[mi] === commonTokens[ci]) {
        unchangedTokens.push(commonTokens[ci]);
        oi++;
        mi++;
        ci++;
      }
      if (unchangedTokens.length > 0) {
        segments.push({ type: 'unchanged', text: unchangedTokens.join('') });
      }
    }
  }
  
  return segments;
}

/**
 * Converts diff segments to HTML with inline styling
 */
export function diffToHtml(segments: DiffSegment[]): string {
  return segments.map(segment => {
    switch (segment.type) {
      case 'removed':
        return `<span class="diff-removed">${escapeHtml(segment.text)}</span>`;
      case 'added':
        return `<span class="diff-added">${escapeHtml(segment.text)}</span>`;
      case 'unchanged':
      default:
        return escapeHtml(segment.text);
    }
  }).join('');
}

/**
 * Escapes HTML special characters
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Generates a side-by-side or inline diff view as HTML
 */
export function generateDiffHtml(original: string, modified: string): string {
  const segments = generateDiff(original, modified);
  return `<div class="diff-container">${diffToHtml(segments)}</div>`;
}

/**
 * Quick summary of changes
 */
export function getDiffSummary(original: string, modified: string): { added: number; removed: number; unchanged: number } {
  const segments = generateDiff(original, modified);
  
  let added = 0, removed = 0, unchanged = 0;
  
  segments.forEach(segment => {
    const wordCount = segment.text.split(/\s+/).filter(w => w.length > 0).length;
    switch (segment.type) {
      case 'added':
        added += wordCount;
        break;
      case 'removed':
        removed += wordCount;
        break;
      case 'unchanged':
        unchanged += wordCount;
        break;
    }
  });
  
  return { added, removed, unchanged };
}
