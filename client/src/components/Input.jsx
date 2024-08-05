import React, { useState } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import { toast } from 'sonner';
import { PulseLoader } from 'react-spinners';

const App = ({ setProducts, setProductUrls }) => {
  const [domain, setDomain] = useState('skininspired.in/');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    let temp = e.target.value;
    if (temp.includes('https://')) {
      temp = temp.split('https://')[1];
    } else if (temp.includes('http://')) {
      temp = temp.split('http://')[1];
    }
    console.log(temp);
    setDomain(temp);
  };

  const fetchRobotsTxt = async () => {
    try {
      const response = await axios.get(`https://${domain}/robots.txt`);
      parseRobotsTxt(response.data);
    } catch (err) {
      console.log(err);
      toast.error('Error fetching robots.txt, check your domain')
      setLoading(false)
    }
  };

  const parseRobotsTxt = (data) => {
    const lines = data.split('\n');
    const sitemapLine = lines.find(line => line.startsWith('Sitemap:'));
    if (sitemapLine) {
      const url = sitemapLine.split(': ')[1];
      fetchSitemap(url);
      console.log(url)
    } else {
      toast.error('No sitemap found in robots.txt');
      setLoading(false)
    }
  };

  const fetchSitemap = async (sitemapUrl) => {
    try {
      const response = await axios.get(`${sitemapUrl}`);
      parseSitemap(response.data);
    } catch (err) {
      console.log(err);
      toast.error('Error fetching sitemap.');
      setLoading(false)
    }
  };

  const parseSitemap = (data) => {
    xml2js.parseString(data, (err, result) => {
      if (err) {
        setError('Error parsing sitemap.');
        setLoading(false)
        return;
      }
      const urls = result.sitemapindex.sitemap.map(url => url.loc[0]);
      console.log(urls)
      const productUrls = urls.filter(url => url.includes('products'));
      setProductUrls(productUrls);
      getProducts(productUrls[0]);
    });
  };

  const getProducts = async (url) => {
    try {
      await axios.get(`${url}`)
        .then((response) => {
          parseProducts(response)
        })
    } catch (err) {
      console.error('Error fetching sitemap:', err);
      toast.error('Error fetching sitemap.');
      setLoading(false)
    }
  };

  const parseProducts = (response) => {
    xml2js.parseString(response.data, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        toast.error('Error parsing sitemap.');
        setLoading(false)
        return;
      }
      if (result.urlset && result.urlset.url) {
        result.urlset.url.forEach((obj, index) => {
          if (obj['image:image'] && obj['image:image'][0]) {
            setProducts((prev) => [
              ...prev,
              {
                url: obj.loc[0],
                image: obj['image:image'][0]['image:loc'][0],
                title: obj['image:image'][0]['image:title'][0],
                caption: obj['image:image'][0]['image:caption'][0],
              }
            ]);
          }
        });
      } else {
        console.error('No URLs found in the sitemap.');
        toast.error('No URLs found in the sitemap.');
      }
    });
    setLoading(false)
  }

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    setError('');
    setProductUrls([]);
    setProducts([]);
    fetchRobotsTxt();
  };

  return (
    <div className="flex flex-col p-4 items-center justify-center gap-4">
      <h1 className='text-3xl font-semibold'>Product Scraper</h1>
      <form onSubmit={handleSubmit} className='flex justify-center w-4/5 gap-x-2'>
        <input
          type="text"
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder="Enter domain name"
          value={domain}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={loading} className={`w-1/5 text-center flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'bg-slate-600' : 'bg-blue-500'}`}>{loading ? <PulseLoader color='#ffffff' /> : 'Scrap'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;