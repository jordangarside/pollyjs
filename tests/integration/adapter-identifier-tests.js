import set from 'lodash-es/set';

function adapterIdentifierTests() {
  describe.only('matchRequestsBy', function() {
    beforeEach(function() {
      const { polly } = this;

      polly.server.post('/*').intercept((req, res) => {
        res.sendStatus(200);
      });

      this.requests = captureRequests(polly.server);
    });

    testConfiguration('method', false, {
      fetch: {
        id: 'e2860bf82860b476e477d53bcf3f4d71',
        identifiers: {
          headers: { 'content-type': 'application/json;charset=utf-8' },
          body: '{}',
          url: 'http://a:b@localhost:4000/pathname?query=param'
        }
      },
      xhr: {
        id: 'e2860bf82860b476e477d53bcf3f4d71',
        identifiers: {
          headers: { 'content-type': 'application/json;charset=utf-8' },
          body: '{}',
          url: 'http://a:b@localhost:4000/pathname?query=param'
        }
      }
    });

    testConfiguration('headers', false, {
      fetch: {
        id: '4f57d7609a46a7aedc8e4409ea26252d',
        identifiers: {
          method: 'POST',
          body: '{}',
          url: 'http://a:b@localhost:4000/pathname?query=param'
        }
      },
      xhr: {
        id: '4f57d7609a46a7aedc8e4409ea26252d',
        identifiers: {
          method: 'POST',
          body: '{}',
          url: 'http://a:b@localhost:4000/pathname?query=param'
        }
      }
    });

    testConfiguration('body', false, {
      fetch: {
        id: '3dbfc69c4a73f3f368ae00aee80d2379',
        identifiers: {
          body: undefined,
          headers: { 'content-type': 'application/json;charset=utf-8' },
          method: 'POST',
          url: 'http://a:b@localhost:4000/pathname?query=param'
        }
      },
      xhr: {
        id: '3dbfc69c4a73f3f368ae00aee80d2379',
        identifiers: {
          body: undefined,
          headers: { 'content-type': 'application/json;charset=utf-8' },
          method: 'POST',
          url: 'http://a:b@localhost:4000/pathname?query=param'
        }
      }
    });

    testConfiguration('order', true, {
      fetch: {
        id: '683833ae6f08ec5c77a7cd8620cd35c9',
        identifiers: {
          headers: { 'content-type': 'application/json;charset=utf-8' },
          method: 'POST',
          body: '{}',
          url: 'http://a:b@localhost:4000/pathname?query=param'
        }
      },
      xhr: {
        id: '683833ae6f08ec5c77a7cd8620cd35c9',
        identifiers: {
          headers: { 'content-type': 'application/json;charset=utf-8' },
          method: 'POST',
          body: '{}',
          url: 'http://a:b@localhost:4000/pathname?query=param'
        }
      }
    });

    describe('url', function() {
      testConfiguration('url.protocol', false, {
        fetch: {
          id: '162f8e80be1b290e52812bfebf528f6c',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: '//a:b@localhost:4000/pathname?query=param'
          }
        },
        xhr: {
          id: '162f8e80be1b290e52812bfebf528f6c',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: '//a:b@localhost:4000/pathname?query=param'
          }
        }
      });

      testConfiguration('url.hostname', false, {
        fetch: {
          id: 'e4b32d97c51e32d71de1294a82f6b04b',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://a:b@:4000/pathname?query=param'
          }
        },
        xhr: {
          id: 'e4b32d97c51e32d71de1294a82f6b04b',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://a:b@:4000/pathname?query=param'
          }
        }
      });

      testConfiguration('url.pathname', false, {
        fetch: {
          id: '12d416e92eff0e8543ede886919c02c2',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://a:b@localhost:4000?query=param'
          }
        },
        xhr: {
          id: '12d416e92eff0e8543ede886919c02c2',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://a:b@localhost:4000?query=param'
          }
        }
      });

      testConfiguration('url.port', false, {
        fetch: {
          id: '147ca2615501f226981619c32341699b',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://a:b@localhost/pathname?query=param'
          }
        },
        xhr: {
          id: '147ca2615501f226981619c32341699b',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://a:b@localhost/pathname?query=param'
          }
        }
      });

      testConfiguration('url.query', false, {
        fetch: {
          id: '0678c78c38e1398f5d6e56d92b4a7647',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://a:b@localhost:4000/pathname'
          }
        },
        xhr: {
          id: '0678c78c38e1398f5d6e56d92b4a7647',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://a:b@localhost:4000/pathname'
          }
        }
      });

      testConfiguration('url.hash', true, {
        fetch: {
          id: 'a21ab01cc69a91e5312239023ea719b8',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://a:b@localhost:4000/pathname?query=param#abc'
          }
        },
        xhr: {
          id: 'a21ab01cc69a91e5312239023ea719b8',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://a:b@localhost:4000/pathname?query=param#abc'
          }
        }
      });

      testConfiguration('url.username', false, {
        fetch: {
          id: '3dbff3c3fbccd6f97d01be31fc7fdd59',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://localhost:4000/pathname?query=param'
          }
        },
        xhr: {
          id: '3dbff3c3fbccd6f97d01be31fc7fdd59',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://localhost:4000/pathname?query=param'
          }
        }
      });

      testConfiguration('url.password', false, {
        fetch: {
          id: '81a335cf1f39055bebb156ebf39a4fd0',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://a@localhost:4000/pathname?query=param'
          }
        },
        xhr: {
          id: '81a335cf1f39055bebb156ebf39a4fd0',
          identifiers: {
            headers: { 'content-type': 'application/json;charset=utf-8' },
            method: 'POST',
            body: '{}',
            url: 'http://a@localhost:4000/pathname?query=param'
          }
        }
      });
    });
  });
}

function captureRequests(server) {
  const reqs = [];

  server.any().on('request', req => reqs.push(req));

  return reqs;
}

function lookupAdapterName(polly) {
  return [...polly.adapters.keys()][0];
}

function testConfiguration(optionName, value, expectedValues) {
  it(`${optionName}=${value}`, async function() {
    const adapterName = lookupAdapterName(this.polly);
    const expectedValue = expectedValues[adapterName];
    const matchRequestsBy = set({}, optionName, value);

    this.polly.configure({
      matchRequestsBy
    });

    await this.fetch('http://a:b@localhost:4000/pathname?query=param#abc', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'content-type': 'application/json;charset=utf-8' }
    });

    const [targetRequest] = this.requests;

    if (targetRequest.identifiers) {
      expect(targetRequest.identifiers).to.deep.equal(
        expectedValue.identifiers
      );
    }

    expect(targetRequest.id).to.equal(expectedValue.id);
  });
}

export default adapterIdentifierTests;
