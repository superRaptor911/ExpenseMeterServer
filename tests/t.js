const serpAnalysisGraph = async (req, res) => {
  try {
    const {keywordId} = req.query;
    if (keywordId) {
      const graphVal = await knex.raw(`SELECT 
      skp.kw_id,skp.date,skp.organic_position
      FROM serp_keyword_position skp
      WHERE skp.kw_id=${keywordId}
      ORDER BY skp.date DESC
      LIMIT 6`);

      const remaining = 6 - graphVal.rows.length();
      if (remaining > 0) {
        const graphVal2 =
          await knex.raw(`SELECT kt.kw_id,kt.date,kt.position as organic_position
      FROM keywords_traffic kt
          WHERE kt.kw_id = ${keywordId}
          ORDER BY kt.date DESC
      LIMIT 6`);

        // remaining data
        const remData = graphVal2.rows.slice(0, remaining);
        // Add rem data to graph val
        graphVal.rows.push.apply(graphVal.rows, remData);
      }

      res.status(200).json({results: graphVal.rows.reverse()});
    } else {
      errorHandler(res, new Error('Keyword Id required'));
    }
  } catch (e) {
    errorHandler(res, e);
  }
};
