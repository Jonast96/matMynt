function Footer() {
  return (
    <footer className="p-2 bg-white w-full flex justify-center">
      <div className="text-center">
        <h4 className="text-primary font-semibold">
          Lagd av:{" "}
          <a
            className="text-accent underline decoration-accent decoration-1"
            target="blank"
            href="https://jonastveit.no/"
          >
            Jon Åstveit
          </a>
        </h4>
        <p>
          {" "}
          <a
            className="text-accent underline decoration-accent decoration-1  font-semibold"
            href="https://kassal.app/api"
          >
            API
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
