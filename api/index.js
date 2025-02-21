import fetch from 'node-fetch';

export default async function handler(req, res) {
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

    // 發送結果到事件處理網址
    const eventResponse = await fetch('https://event-three-rose.vercel.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result)
    });

    if (!eventResponse.ok) {
      throw new Error('事件發送失敗');
    }

    // 回傳成功訊息
    res.status(200).json({ message: '事件已成功發送' });
    
  } catch (error) {
    console.error('錯誤：', error);
    res.status(500).json({ error: '處理請求時發生錯誤' });
  }
} 