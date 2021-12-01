interface IUserAuthenticate {
  name: string;
  email: string;
}

interface IAuthenticateUserResponseDTO {
  user: IUserAuthenticate;
  token: string;
}

export { IAuthenticateUserResponseDTO };
