interface CreatePostDTO {
  title: string;
  content: string;
}

interface UpdatePostDTO {
  title?: string;
  content?: string;
}

export { CreatePostDTO, UpdatePostDTO };
