type Props = {
  url: string;
  name: string;
};
const SingUpVerificationTemplate = ({ name, url }: Props) => {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>Please verify your account to complete the sign up.</p>
      <a href={url} className={"block px-4 py-2 bg-black text-white font-bold"}>
        Verify
      </a>
    </div>
  );
};

export default SingUpVerificationTemplate;
