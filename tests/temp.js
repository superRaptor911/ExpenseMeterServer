function getDays(dt) {
  const diffInMs = new Date() - new Date(dt);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays;
}

async function getCountOfDaysSinceProjectWasCreated(projectId, trx) {
  try {
    const data = await trx.raw(`SELECT 
    created_at 
  FROM 
    projects p 
  WHERE 
    id =${projectId} 
  ORDER BY 
    created_at DESC`);
    return getDays(data.rows[0].created_at);
  } catch (e) {
    /* handle error */
    console.error('Error: ', e);
    throw e;
  }
}

async function getSerpData(projectId, trx, interval) {
  try {
    const data = await trx.raw(`SELECT 
    kw_id, 
    page_id, 
    (101 - skp.organic_position) AS biscuit_index, 
    skp.date 
  FROM 
    serp_keyword_position skp 
    LEFT JOIN keywords k ON k.id = skp.kw_id 
  WHERE 
    k.proj_id =${projectId}
    AND skp.date >= now() - INTERVAL '${interval} day'`);
    return data;
  } catch (e) {
    console.error('Error: ', e);
    throw e;
  }
}

async function getConsoleData(projectId, trx, interval) {
  try {
    const data = await trx.raw(`SELECT 
    kw_id, 
    page_id, 
    ROUND(
      (101 - ok.position), 
      0
    ) AS biscuit_index, 
    ok.date 
  FROM 
    organic_keywords ok 
    LEFT JOIN keywords k ON k.id = ok.kw_id 
  WHERE 
    k.proj_id =${projectId} 
    AND ok.date >= now() - INTERVAL '49 day'
    AND ok.date < now() - INTERVAL '${interval} day'
  `);

    return data;
  } catch (e) {
    console.error('Error: ', e);
    throw e;
  }
}

async function getDataSerpGSC(projectId, trx) {
  try {
    let data = null;
    const projectCreationDateDaysCounter =
      await getCountOfDaysSinceProjectWasCreated(projectId, trx);
    if (projectCreationDateDaysCounter < 7) {
      data = await getConsoleData(
        projectId,
        trx,
        projectCreationDateDaysCounter,
      );
    } else if (projectCreationDateDaysCounter < 14) {
      data = await getConsoleData(
        projectId,
        trx,
        projectCreationDateDaysCounter,
      );
      const getSerpDataResponse = await getSerpData(projectId, trx, 7);
      data.rows.push.apply(data.rows, getSerpDataResponse.rows);
    } else if (projectCreationDateDaysCounter < 21) {
      data = await getConsoleData(
        projectId,
        trx,
        projectCreationDateDaysCounter,
      );
      const getSerpDataResponse = await getSerpData(projectId, trx, 14);
      data.rows.push.apply(data.rows, getSerpDataResponse.rows);
    }
    return data;
  } catch (e) {
    console.error('Error: ', e);
    throw e;
  }
}
