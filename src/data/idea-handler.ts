const ideaServiceRoot = "https://concepts-service-n5ey5.ondigitalocean.app";

interface FeedResponseData {
  status_code: number;
  next_offset: number;
  pinned_start: string;
  paged_items: PagedItem[];
}

interface PagedItem {
  author: string;
  title: string;
}

const feedHelper = async (): Promise<FeedResponseData> => {
  const response = await fetch(`${ideaServiceRoot}/feed/page`);
  if (response.ok) {
    const data: FeedResponseData = await response.json();
    return data;
  }
  throw new Error(
    `Failed to submit form data. Status code: ${response.status}`
  );
};

export type Idea = {
  title: string;
  image_url: string;
  author: string;
  description: string;
  diagram: {};
};

type IdeaResponse = {
  status_code: number;
  msg: string;
  items: Idea[];
};

export const fetchFeed = async (): Promise<Idea[]> => {
  const ideas: Idea[] = [];
  const pagedItems = (await feedHelper()).paged_items;

  for (const item of pagedItems) {
    const response = await fetch(
      `${ideaServiceRoot}/concepts/${item.author}/${item.title}`
    );

    if (response.ok) {
      const data: IdeaResponse = await response.json();
      ideas.push(data.items[0]);
    }
  }
  return ideas;
};

export const fetchExact = async (
  author: string,
  title: string
): Promise<Idea> => {
  const response = await fetch(
    `${ideaServiceRoot}/concepts/${author}/${title}`
  );
  if (response.ok) {
    const data: IdeaResponse = await response.json();
    return data.items[0];
  } else {
    throw new Error(
      `Failed to submit form data. Status code: ${response.status}`
    );
  }
};
