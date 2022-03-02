import create from 'zustand'

export type FullPost = {
  title: string,
  post: string,
  date: any,
  id: string,
  urlForImage?: string,
  altText?: string
}

type Store = {
  posts: FullPost[];
  setPosts: (posts: FullPost[]) => void;
  chosenPost: FullPost;
  setChosenPost: (post: FullPost) => void
};

const useStore = create<Store>((set) => ({
  // userName: "",
  // setUserName: (userName) => {
  //   set(() => ({
  //     userName: userName
  //   }))
  // },
  posts: [],
  setPosts: (posts) => {
    set(() => ({
      posts: posts
    }))
  },
  chosenPost: undefined,
  setChosenPost: (chosenPost) => {
    set(() => ({
      chosenPost: chosenPost
    }))
  } ,
}))

export default useStore
