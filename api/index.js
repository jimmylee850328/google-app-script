export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只接受 POST 請求' });
  }

  try {
    const data = req.body;
    const result = {};
    
    // 處理每個輸入的 key-value pair
    Object.keys(data).forEach(key => {
      // 取得 key 的前兩個字元
      const newKey = key.substring(0, 2);
      // 將 value 乘以 2
      result[newKey] = data[key] * 2;
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: '處理請求時發生錯誤' });
  }
} 