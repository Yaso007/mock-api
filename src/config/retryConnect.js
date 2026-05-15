const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForDb(pool, maxRetries = 10, delay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await pool.query("SELECT 1");
      console.log("✅ Database is ready");
      return;
    } catch (err) {
      console.log(
        `⏳ DB not ready (attempt ${attempt}/${maxRetries}) - retrying...`
      );

      if (attempt === maxRetries) {
        throw new Error("❌ Database connection failed after retries");
      }

      await sleep(delay);
    }
  }
}

module.exports = waitForDb;