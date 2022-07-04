// import { getMockSettingData } from '../../../stubs/request.stub';
import axios from 'axios';
import { fetchAllAvailableBooks, fetchOneBook } from '../../../services/book.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function getMockResponse(state = true) {
  return {
    status: state ? 'success' : 'failed',
    data: [{
        _id: "62c1b1cb4dee84ccc15360cd",
        title: "BAD Boys",
        author: "Soyinka",
        publisher: "Rashotech",
        availability: true,
    }]
  };
}

function getMockSingleResponse(state = true) {
    return {
        status: state ? 'success' : 'failed',
        data: {
            _id: "62c1b1cb4dee84ccc15360cd",
            title: "BAD Boys",
            author: "Soyinka",
            publisher: "Rashotech",
            availability: true,
        }
    };
}

function getBookId() {
    return '62c1b1cb4dee84ccc15360cd';
}

describe('Fetch All Availabe books', function () {
  beforeEach(function () {
    jest.resetModules();
  });

  it('fetch books', async function () {
    mockedAxios.get.mockResolvedValueOnce(getMockResponse());
    const response = await fetchAllAvailableBooks({});
    expect(response[0]._id).toBe('62c1b1cb4dee84ccc15360cd');
    expect(response[0].title).toBe('BAD Boys');
    expect(response[0].author).toBe("Soyinka");
    expect(response[0].publisher).toBe("Rashotech");
    expect(response[0].availability).toBe(true);
  });

  it('throws an exception when api call fails', async function () {
    expect.assertions(1);
    mockedAxios.get.mockRejectedValue(getMockResponse(false));
    try {
        const response = await fetchAllAvailableBooks({});
    } catch (e: any) {
      expect(e.name).toBe('Error');
    }
  });
});

describe('Fetch One books', function () {
    beforeEach(function () {
      jest.resetModules();
    });
  
    it('fetch a single book', async function () {
      mockedAxios.get.mockResolvedValueOnce(getMockSingleResponse(true));
      const response = await fetchOneBook(getBookId());
      expect(response._id).toBe('62c1b1cb4dee84ccc15360cd');
      expect(response.title).toBe('BAD Boys');
      expect(response.author).toBe("Soyinka");
      expect(response.publisher).toBe("Rashotech");
      expect(response.availability).toBe(true);
    });
  
    it('throws an exception when api call fails', async function () {
      expect.assertions(1);
      mockedAxios.get.mockRejectedValue(getMockResponse(false));
      try {
        await fetchOneBook(getBookId());
      } catch (e: any) {
        expect(e.name).toBe('Error');
      }
    });
});
  
