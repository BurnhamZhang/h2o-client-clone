/**
 * Created by zhangbohan on 16/11/16.
 */

const MOCK_URL = 'http://172.25.46.33:8080';
const DEVELOPMENT_URL = 'http://172.25.46.129:8081';
const TEST_URL = 'http://172.24.5.109:8101';
const PRODUCTION_URL = 'http://172.24.5.109:8101';

let url;

if (process.env.DATABASE == 'prod') {
    url = PRODUCTION_URL;
}
else if (process.env.DATABASE == 'test') {
    url = TEST_URL;
}
else if (process.env.DATABASE == 'dev') {
    url = DEVELOPMENT_URL;
}
else if (process.env.DATABASE == 'mock') {
    url = MOCK_URL
}

export default url