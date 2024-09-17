type InputCounterProps = {
  count: number;
  limit: number;
};

const InputCounter = ({ count, limit }: InputCounterProps) => {
  return (
    <>
      <p className="input__counter">
        {count} / {limit}
      </p>
    </>
  );
};
export default InputCounter;
