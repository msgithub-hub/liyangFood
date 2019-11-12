import { axios } from 'castle-haozijunqaq-uni-utils'

export function getQuestions() {
    return axios.postData('/keyanshi/login/answer')
}

/**
 答完题提交接口
 **/
export function answerAjax(arr) {
    return axios.postJSON('/keyanshi/login/answerAjax',{ arr })
}