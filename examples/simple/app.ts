import axios from '../../packages/core/src/index';

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2,
  },
});
