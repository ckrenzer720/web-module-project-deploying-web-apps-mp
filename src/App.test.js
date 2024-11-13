import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AppFunctional from "./AppFunctional"; // Adjust the path based on your setup
import "@testing-library/jest-dom/extend-expect"; // For the `toBeInTheDocument()` matcher

describe("AppFunctional Component", () => {
  // Test that visible texts in headings, buttons, etc. render on the screen
  test("renders headings, buttons, and input fields correctly", () => {
    render(<AppFunctional />);

    // Check headings
    expect(screen.getByText(/Coordinates/i)).toBeInTheDocument();
    expect(screen.getByText(/You moved 0 times/i)).toBeInTheDocument();

    // Check buttons
    expect(screen.getByText("LEFT")).toBeInTheDocument();
    expect(screen.getByText("UP")).toBeInTheDocument();
    expect(screen.getByText("RIGHT")).toBeInTheDocument();
    expect(screen.getByText("DOWN")).toBeInTheDocument();
    expect(screen.getByText("reset")).toBeInTheDocument();

    // Check email input placeholder
    expect(screen.getByPlaceholderText("type email")).toBeInTheDocument();

    // Check submit button
    expect(screen.getByDisplayValue("Submit")).toBeInTheDocument();
  });

  // Test that typing in the input field updates its value
  test("typing in the email input field updates its value", () => {
    render(<AppFunctional />);

    const emailInput = screen.getByPlaceholderText("type email");

    // Initially, the email input should be empty
    expect(emailInput.value).toBe("");

    // Simulate typing in the input field
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // Now, the input value should reflect the typed text
    expect(emailInput.value).toBe("test@example.com");
  });
});
