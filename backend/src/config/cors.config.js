export const corsConfig = {
  origin: (origin, callback) => {
    const allowlist = "*";

    if (allowlist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  headers: ["Content-Type"],
};
