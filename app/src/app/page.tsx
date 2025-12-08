"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="d-flex flex-column min-vh-100"> {/* Full page height */}

            <section className="bg-dark text-white text-center py-5 w-100">
                <div className="px-0 mx-0">
                    <h1 className="fw-bold display-3">Find Your Perfect Parking</h1>
                    <p className="mt-3 fs-4">
                        Secure & affordable parking near airports, stations and city centers
                    </p>
                    <div>
                        <Link
                            href="/portfolio"
                            className="btn btn-lg mt-4 px-5 py-3 fw-semibold text-white"
                            style={{ backgroundColor: "#fd6a01", borderColor: "#fd6a01" }}
                        >
                            Browse Parking Spots
                        </Link>
                    </div>

                    <div>
                        <Link
                            href="/booking"
                            className="btn btn-lg mt-4 px-5 py-3 fw-semibold text-white"
                            style={{ backgroundColor: "#fd6a01", borderColor: "#fd6a01" }}
                        >
                            booking
                        </Link>
                    </div>
                </div>
            </section>


            {/* Content Area should expand */}
            <main className="flex-grow-1">

                {/* Why Choose Us */}
                <section className="container my-5">
                    <h2 className="text-center fw-bold mb-4">Why Choose Us?</h2>

                    <div className="row text-center g-4">
                        <div className="col-md-4">
                            <i className="bi bi-shield-lock-fill fs-1 text-primary" />
                            <h5 className="fw-semibold mt-3">Secure Parking</h5>
                            <p className="text-muted">
                                24/7 monitored parking with maximum safety.
                            </p>
                        </div>

                        <div className="col-md-4">
                            <i className="bi bi-cash-coin fs-1 text-success" />
                            <h5 className="fw-semibold mt-3">Affordable Prices</h5>
                            <p className="text-muted">
                                Best prices guaranteed, pay only for the time you need.
                            </p>
                        </div>

                        <div className="col-md-4">
                            <i className="bi bi-geo-alt-fill fs-1 text-danger" />
                            <h5 className="fw-semibold mt-3">Close to You</h5>
                            <p className="text-muted">
                                Parking spots near airports and top city spots.
                            </p>
                        </div>
                    </div>
                </section>

            </main>

            <footer className="bg-dark text-white text-center py-3 w-100 mt-auto">
                © {new Date().getFullYear()} Roosh — All Rights Reserved
            </footer>
        </div>
    );
}
