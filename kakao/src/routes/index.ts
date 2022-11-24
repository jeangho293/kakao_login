import { Router } from 'express'
import axios from 'axios'
import * as zlib from 'zlib';

export const router = Router()
const REST_API_KEY = '3d76b6bc827c7084853a6339d2e8ff47'
const REDIRECT_URI = 'http://localhost:4000/kakao/login'

router.get('/kakao/login', async (req, res) => {
  const code = req.query.code

  const data = await axios.post(
    `https://kauth.kakao.com/oauth/token`,
    `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`
    ,{
      responseType: "arraybuffer",
      decompress: true
    });
  zlib.gunzip(data.data, (error, result) => {
    console.log(JSON.parse(result.toString()));
    return res.json({data: JSON.parse(result.toString())})
  })
})