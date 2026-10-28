// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title SimpleMath - คำนวณเลขพื้นฐาน (บวก ลบ คูณ หาร)
contract SimpleMath {
    /// @notice บวกเลขสองจำนวน
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    /// @notice ลบเลข a - b (ต้อง a >= b เพราะ uint256 ติดลบไม่ได้)
    function subtract(uint256 a, uint256 b) public pure returns (uint256) {
        require(a >= b, "SimpleMath: subtraction underflow");
        return a - b;
    }

    /// @notice คูณเลขสองจำนวน
    function multiply(uint256 a, uint256 b) public pure returns (uint256) {
        return a * b;
    }

    /// @notice หารเลข a / b (ปัดเศษทิ้ง, ห้ามหารด้วย 0)
    function divide(uint256 a, uint256 b) public pure returns (uint256) {
        require(b != 0, "SimpleMath: division by zero");
        return a / b;
    }
}
