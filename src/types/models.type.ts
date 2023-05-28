export type productModel = {
  id: string;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: ['CommentModel', 'CommentModel'];
};
export type commentModel = {
  id: number;
  productId: number;
  description: string;
  date: string;
};
