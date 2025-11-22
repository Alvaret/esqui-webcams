export default async function handler(req, res) {
  const { estacion } = req.query;

  if (!estacion) {
    return res.status(400).json({ error: 'Parámetro estacion requerido' });
  }

  try {
    let url;
    let estadoData = {};

    // URLs según la estación
    switch (estacion.toLowerCase()) {
      case 'sierra-nevada':
        url = 'https://www.infonieve.es/estacion-esqui/sierra-nevada/';
        estadoData = await scrapeSierraNevada(url);
        break;
      case 'candanchu':
        url = 'https://www.infonieve.es/estacion-esqui/candanchu/';
        estadoData = await scrapeCandanchu(url);
        break;
      case 'boi-taull':
        url = 'https://www.infonieve.es/estacion-esqui/boi-taull/';
        estadoData = await scrapeBoiTaull(url);
        break;
      case 'valdelinares':
        url = 'https://www.infonieve.es/estacion-esqui/valdelinares/';
        estadoData = await scrapeValdelinares(url);
        break;
      default:
        return res.status(400).json({ error: 'Estación no soportada' });
    }

    res.status(200).json({
      estacion,
      timestamp: new Date().toISOString(),
      ...estadoData
    });
  } catch (error) {
    console.error('Error scraping:', error);
    res.status(500).json({ 
      error: 'Error al obtener información de pistas',
      message: error.message 
    });
  }
}

async function fetchWithRetry(url, retries = 3) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  };

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, { headers, timeout: 10000 });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

async function scrapeSierraNevada(url) {
  console.log('Scraping:', url);
  const html = await fetchWithRetry(url);

  // Extraer remontes
  const remotesMatch = html.match(/Remontes<br><strong[^>]*>([^<]*)<\/strong><em>\/(\d+)/);
  const remontes = remotesMatch ? {
    abiertos: remotesMatch[1].trim(),
    total: remotesMatch[2]
  } : null;

  // Extraer kilómetros
  const kilosMatch = html.match(/Kilómetros<br><strong[^>]*>([^<]*)<\/strong><em>\/([^<]*)<\/em>/);
  const kilometros = kilosMatch ? {
    abiertos: kilosMatch[1].trim(),
    total: kilosMatch[2].trim()
  } : null;

  // Extraer nieve
  const nieveMatch = html.match(/Nieve<br><strong[^>]*>([^<]*)<\/strong><em>([^<]*)<\/em>/);
  const nieve = nieveMatch ? {
    altura: nieveMatch[1].trim(),
    unidad: nieveMatch[2].trim()
  } : null;

  console.log('Parsed:', { remontes, kilometros, nieve });

  return {
    remontes,
    kilometros,
    nieve
  };
}

async function scrapeCandanchu(url) {
  console.log('Scraping:', url);
  const html = await fetchWithRetry(url);

  const remotesMatch = html.match(/Remontes<br><strong[^>]*>([^<]*)<\/strong><em>\/(\d+)/);
  const remontes = remotesMatch ? {
    abiertos: remotesMatch[1].trim(),
    total: remotesMatch[2]
  } : null;

  const kilosMatch = html.match(/Kilómetros<br><strong[^>]*>([^<]*)<\/strong><em>\/([^<]*)<\/em>/);
  const kilometros = kilosMatch ? {
    abiertos: kilosMatch[1].trim(),
    total: kilosMatch[2].trim()
  } : null;

  const nieveMatch = html.match(/Nieve<br><strong[^>]*>([^<]*)<\/strong><em>([^<]*)<\/em>/);
  const nieve = nieveMatch ? {
    altura: nieveMatch[1].trim(),
    unidad: nieveMatch[2].trim()
  } : null;

  return {
    remontes,
    kilometros,
    nieve
  };
}

async function scrapeBoiTaull(url) {
  console.log('Scraping:', url);
  const html = await fetchWithRetry(url);

  const remotesMatch = html.match(/Remontes<br><strong[^>]*>([^<]*)<\/strong><em>\/(\d+)/);
  const remontes = remotesMatch ? {
    abiertos: remotesMatch[1].trim(),
    total: remotesMatch[2]
  } : null;

  const kilosMatch = html.match(/Kilómetros<br><strong[^>]*>([^<]*)<\/strong><em>\/([^<]*)<\/em>/);
  const kilometros = kilosMatch ? {
    abiertos: kilosMatch[1].trim(),
    total: kilosMatch[2].trim()
  } : null;

  const nieveMatch = html.match(/Nieve<br><strong[^>]*>([^<]*)<\/strong><em>([^<]*)<\/em>/);
  const nieve = nieveMatch ? {
    altura: nieveMatch[1].trim(),
    unidad: nieveMatch[2].trim()
  } : null;

  return {
    remontes,
    kilometros,
    nieve
  };
}

async function scrapeValdelinares(url) {
  console.log('Scraping:', url);
  const html = await fetchWithRetry(url);

  const remotesMatch = html.match(/Remontes<br><strong[^>]*>([^<]*)<\/strong><em>\/(\d+)/);
  const remontes = remotesMatch ? {
    abiertos: remotesMatch[1].trim(),
    total: remotesMatch[2]
  } : null;

  const kilosMatch = html.match(/Kilómetros<br><strong[^>]*>([^<]*)<\/strong><em>\/([^<]*)<\/em>/);
  const kilometros = kilosMatch ? {
    abiertos: kilosMatch[1].trim(),
    total: kilosMatch[2].trim()
  } : null;

  const nieveMatch = html.match(/Nieve<br><strong[^>]*>([^<]*)<\/strong><em>([^<]*)<\/em>/);
  const nieve = nieveMatch ? {
    altura: nieveMatch[1].trim(),
    unidad: nieveMatch[2].trim()
  } : null;

  return {
    remontes,
    kilometros,
    nieve
  };
}
