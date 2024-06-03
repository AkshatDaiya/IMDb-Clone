const Router = require("express").Router();
const UserC = require("../controllers/user");
const RegC = require("../controllers/reg");
const jwtVerifyUser = require("../middleware/JwtVerifyUser");

Router.get("/allData", UserC.getAllData);
Router.post("/dataDetails", jwtVerifyUser, UserC.singleDataDetail);
Router.post("/dataSuggestion", UserC.singleDataSuggestion);
Router.post("/watchListId/:firstName", UserC.watchListId);
Router.get("/watchListData/:firstName", jwtVerifyUser, UserC.watchListData);
Router.post("/itemCount", UserC.watchListItemCount);
// Router.post('/searchItem', UserC.searchItem)
Router.post("/deleteWL/:id", UserC.watchListDataDelete);

Router.post("/reg", RegC.registration);
Router.post("/emailActivation/:id", RegC.emailActivation);
Router.post("/login", RegC.login);

module.exports = Router;
