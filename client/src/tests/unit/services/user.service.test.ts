// import { getMockSettingData } from '../../../stubs/request.stub';
import axios from 'axios';
import { fetchAllUsers, UserRegistration } from '../../../services/user.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function getMockResponse(state = true) {
  return {
    status: state ? 'success' : 'failed',
    data: [{
        _id: "62c1a82da5c58d68a5edbc4e",
        firstName: "Rasheed",
        lastName: "Ayoade",
        email: "rashotech@gmail.com"
    }]
  };
}

function getMockSingleResponse(state = true) {
    return {
        status: state ? 'success' : 'failed',
        data: {
            "_id": "62c1a82da5c58d68a5edbc4e",
            "firstName": "Rasheed",
            "lastName": "Ayoade",
            "email": "rashotech@gmail.com",
        }
    };
}

function getBookId() {
    return '62c1b1cb4dee84ccc15360cd';
}

function userRequest() {
    return {
        "firstName": "Rasheed",
        "lastName": "Ayoade",
        "email": "rashotech@gmail.com",
    }
}

describe('User Registration', function () {
  beforeEach(function () {
    jest.resetModules();
  });

  it('register user', async function () {
    mockedAxios.get.mockResolvedValueOnce(getMockResponse());
    const response = await UserRegistration(userRequest());
    expect(response._id).toBe('62c1a82da5c58d68a5edbc4e');
    expect(response.firstName).toBe('Rasheed');
    expect(response.email).toBe("rashotech@gmail.com");
    expect(response.lastName).toBe("Ayoade");
  });

  it('throws an exception when api call fails', async function () {
    expect.assertions(1);
    mockedAxios.get.mockRejectedValue(getMockResponse(false));
    try {
        const response = await UserRegistration(userRequest());
    } catch (e: any) {
      expect(e.name).toBe('Error');
    }
  });
});

describe('Get All Users', function () {
    beforeEach(function () {
      jest.resetModules();
    });
  
    it('fetch all users', async function () {
      mockedAxios.get.mockResolvedValueOnce(getMockSingleResponse(true));
      const response = await fetchAllUsers();
      expect(response[0]._id).toBe('62c1b1cb4dee84ccc15360cd');
      expect(response[0].firstName).toBe('Rasheed');
      expect(response[0].email).toBe("rashotech@gmail.com");
      expect(response[0].lastName).toBe("Ayoade");
    });
  
    it('throws an exception when api call fails', async function () {
      expect.assertions(1);
      mockedAxios.get.mockRejectedValue(getMockResponse(false));
      try {
        await fetchAllUsers();
      } catch (e: any) {
        expect(e.name).toBe('Error');
      }
    });
});
  
