const crtlWrapper = ctrl => {
    const func = async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
          next(error)
        }
}
return func;
}

module.exports = crtlWrapper;

// const ctrlWrapper = (ctrl) => async (req, res, next) => {
//   try {
//     await ctrl(req, res); // Removed the 'next' parameter from the inner function call
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   ctrlWrapper,
// };