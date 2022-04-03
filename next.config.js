/** @type {import('next').NextConfig} */
module.exports = {

  // useReducerがどうやっても２回描画されるのでoff
  // https://github.com/facebook/react/issues/16295
  // https://stackoverflow.com/questions/54892403/usereducer-action-dispatched-twice
  // reactStrictMode: true,

}
