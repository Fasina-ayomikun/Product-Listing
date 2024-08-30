export interface Data {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: string;
}
export const defaultProducts: Data[] = [
  {
    name: "Curology Body Cream",
    desc: "A nice body cream",
    price: 2300,
    image:
      "https://firebasestorage.googleapis.com/v0/b/unichat-7e411.appspot.com/o/images%2F1725027872112-curology-DGH1u80sZik-unsplash.jpg%7D?alt=media&token=c4ed458c-7007-4b85-a244-e3faa8efd65a",
    category: "cream",
    id: "a1d1e2ac9a758032781b8d54145a908edcbeb93ecfbc1e0ba692fda4fc7290d8",
  },
  {
    name: "Hemp Seed hair cream",
    desc: "A nice cream",
    price: 1000,
    image:
      "https://firebasestorage.googleapis.com/v0/b/unichat-7e411.appspot.com/o/images%2F1725027949214-alex-lvrs-mTw_GePuRUE-unsplash.jpg%7D?alt=media&token=dff0b393-cec3-4e81-b40c-f292291bc9a2",
    category: "cream",
    id: "76accb32f2201e4e3a3e54c1fd41ec0f2abce09820ada80147992cbfd58a3da3",
  },
  {
    name: "Ladies Footwear",
    desc: "A nice comfy wear",
    price: 10000,
    image:
      "https://firebasestorage.googleapis.com/v0/b/unichat-7e411.appspot.com/o/images%2F1725027991715-jaclyn-moy-ugZxwLQuZec-unsplash.jpg%7D?alt=media&token=014e4b22-94eb-4d54-aa55-f7dd4a3563d6",
    category: "footwear",
    id: "af00766bfd2feb3d61bd4214eb28b4efad844e2740151048da7c248a75635fb7",
  },
  {
    name: "Face Cream",
    desc: "Nice product",
    price: 2000,
    image:
      "https://firebasestorage.googleapis.com/v0/b/unichat-7e411.appspot.com/o/images%2F1725028037233-priscilla-du-preez-5NQkmZyT03s-unsplash.jpg%7D?alt=media&token=89b18b3a-93cf-4c39-aa5d-84f365270020",
    category: "cream",
    id: "858356dd19af172e1ab86d026ae78875aa3771b6033073c9cb5b4d0932b496b3",
  },
  {
    name: "Face Scrub",
    desc: "Nice scrub",
    price: 3000,
    image:
      "https://firebasestorage.googleapis.com/v0/b/unichat-7e411.appspot.com/o/images%2F1725028076450-kadarius-seegars-Mxy5gokl8mE-unsplash.jpg%7D?alt=media&token=0a0e233e-5db4-4589-aa07-2478477ef069",
    category: "cream",
    id: "ae4675e13b4b3996dec20fe17b0dc7de1d023258ccefdac37e937ed9d5b8fd8f",
  },
  {
    name: "Body Scrub",
    desc: "dope",
    price: 5000,
    image:
      "https://firebasestorage.googleapis.com/v0/b/unichat-7e411.appspot.com/o/images%2F1725028187186-reuben-mansell-nwOip8AOZz0-unsplash.jpg%7D?alt=media&token=6579b4bf-8b8f-4e3d-9d74-35f4b7353969",
    category: "cream",
    id: "5eee87a998bb97be0d7aa06be412fc0e516c9ca488dc64b9210629b6e8ed4593",
  },
];
export const initialData = {
  name: "",
  desc: "",
  price: 0,
  image: "",
  category: "all",
};
