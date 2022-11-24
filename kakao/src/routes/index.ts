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

  // NOTE: nodeJS로 받아오는 response을 받아오는 경우, gzip decompress 작업을 직접해줘야햐므로 zlib 사용.
  zlib.gunzip(data.data, (error, result) => {
    console.log(JSON.parse(result.toString()));
    // NOTE: 여기선 카카오톡으로부터 받은 accessToken 등 데이터를 그냥 주었다. 각자의 프로젝트에 맞게 토큰을 생성해 커스텀하는건 본인 몫.
    return res.json({data: JSON.parse(result.toString())})
  })
})