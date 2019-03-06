import KJUR from "jsrsasign";

export default {
  create(jwtstring) {
    // Header
    var oHeader = { alg: "HS256", typ: "JWT" };
    // Payload
    var oPayload = {};
    var tNow = KJUR.jws.IntDate.get("now");
    var tEnd = KJUR.jws.IntDate.get("now + 1day");
    oPayload.iss = "http://foo.com";
    oPayload.sub = "mailto:mike@foo.com";
    oPayload.nbf = tNow;
    oPayload.iat = tNow;
    oPayload.exp = tEnd;
    oPayload.jti = "id123456";
    oPayload.aud = "http://foo.com/employee";
    // Sign JWT, password=616161
    var sHeader = JSON.stringify(oHeader);
    var sPayload = JSON.stringify(oPayload);
    var sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "616161");

    return sJWT;
  },
  verify(jwtstring) {
    return KJUR.jws.JWS.verifyJWT(jwtstring, "EXAT1234", { alg: ["HS256"] });
  }
};
