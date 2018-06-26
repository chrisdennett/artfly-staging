// Using paddle code from cdn as recommended so can't import
// Instead the paddle cnd script link is referenced in the head tag: public > index.html
const Paddle = window.Paddle;
Paddle.Setup({
    vendor: 14276
});

export const ProductId = "516947"; // artist membership
// export const ProductIdFamily = "533578"; // family membership
// export const ProductIdSchool = "518909"; // school membership

export default Paddle;
