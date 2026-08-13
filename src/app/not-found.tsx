import Link from "next/link";

export default function NotFound() {
  return (
    <div className="a-contact a-miss">
      <div className="brief" id="content">
        <h1>Out of the session.</h1>
        <p className="note">This page is not on the calendar.</p>
        <Link className="go" href="/">
          Back to Home →
        </Link>
      </div>
    </div>
  );
}
