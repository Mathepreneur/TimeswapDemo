pragma solidity >=0.6.0;

interface IERC20 {
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint value) external returns (bool);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);
}

interface TimeswapCallee {
    function timeswapCall(address sender, uint256 value, bytes calldata data) external;
}

library SafeMathUint256 {
    function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x + y) >= x, "SafeMathUint256: Add Overflow");
    }
    
    function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x - y) <= x, "SafeMathUint256: Sub Overflow");
    }
}

library SafeMathInt256 {
    function add(int256 x, int256 y) internal pure returns (int256 z) {
        z = x + y;
        require((y >= 0 && z >= x) || (y < 0 && z < x), "SafeMathInt256: Add Overflow");
    }
    
    function sub(int256 x, int256 y) internal pure returns (int256 z) {
        z = x - y;
        require((y >= 0 && z <= x) || (y < 0 && z > x), "SafeMathInt256: Sub Overflow");
    }
    
    function negate(int256 x) internal pure returns (int256 y) {
        require(x != -2**255, "Timeswap: Mul Overflow");
        
        y = x * (-1);
    }
}

contract TimeswapToken2 {
    using SafeMathUint256 for uint256;
    using SafeMathInt256 for int256;
    
    // CONSTANT 
    
    string constant NAME = "Timeswap";
    string constant SYMBOL = "TIME";
    uint8 constant DECIMALS = 18;
    
    // MODEL 
    
    uint256 _totalSupply;
    
    mapping(address => int256) _balanceOf;
    mapping(address => mapping(address => uint256)) _allowance;
    
    // EVENT 
    
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event DebtApproval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event DebtTransfer(address indexed from, address indexed to, uint256 value);
    
    // UPDATE
    
    function approve(address spender, uint256 value) external returns (bool) {
        _approve(spender, value);
        
        return true;
    }
    
    function transfer(address to, uint256 value) external returns (bool) {
        _transferFrom(msg.sender, to, value);
        
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        if (_allowance[from][msg.sender] != uint(-1)) {
            _allowance[from][msg.sender] = _allowance[from][msg.sender].sub(value);
        }
        
        _transferFrom(from, to, value);
        
        return true;
    }
    
    function transferWith(address from, address to, uint256 value, bytes calldata data) external returns (bool) {
        if (_allowance[from][msg.sender] != uint(-1)) {
            _allowance[from][msg.sender] = _allowance[from][msg.sender].sub(value);
        }
        
        _transferFrom(from, to, value);
        if (data.length > 0) TimeswapCallee(to).timeswapCall(msg.sender, value, data);
        
        return true;
    }
    
    // VIEW 
    
    function name() external pure returns (string memory) {
        return NAME;
    }
    
    function symbol() external pure returns (string memory) {
        return SYMBOL;
    }
    
    function decimals() external pure returns (uint8) {
        return DECIMALS;
    }
    
    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address owner) external view returns (uint256) {
        return _balanceOf[owner] >= 0 ? uint256(_balanceOf[owner]) : 0;
    }
    
    function debtOf(address owner) external view returns (uint256) {
        return _balanceOf[owner] <= 0 ? uint256(_balanceOf[owner].negate()) : 0;
    }
    
    function allowance(address owner, address spender) external view returns (uint256) {
        return _allowance[owner][spender];
    }
    
    // HELPER
    
    function _approve(address spender, uint256 value) private {
        require(spender != address(0), "Timeswap: Zero Address");
        _allowance[msg.sender][spender] = value;
        
        emit Approval(msg.sender, spender, value);
    }

    function _transferFrom(address from, address to, uint256 value) private {
        require(to != address(0), "Timeswap: Zero Address");
        
        int256 value0;
        int256 value1;
        if (value >= 2**255) {
            value0 = 2**255 - 1;
            value1 = int256(value - (2**255 - 1));
        }
        else {
            value0 = int256(value);
            value1 = 0;
        }
        
        int256 newBalanceFrom = _balanceOf[from].sub(value0).sub(value1);
        int256 newBalanceTo = _balanceOf[to].add(value0).add(value1);
        uint256 newSupply = _totalSupply;
        
        if (_balanceOf[from] >= 0 && newBalanceFrom < 0) {
            uint256 _supply = uint256(newBalanceFrom.negate());
            newSupply = newSupply.add(_supply);
            emit Transfer(address(0), from, _supply);
        } else if (_balanceOf[from] < 0) {
            uint256 _supply = uint256(_balanceOf[from].sub(newBalanceFrom));
            newSupply = newSupply.add(_supply);
            emit Transfer(address(0), from, _supply);
        }
        
        if (_balanceOf[to] < 0 && newBalanceTo >= 0) {
            uint256 _supply = uint256(_balanceOf[to].negate());
            newSupply = newSupply.sub(_supply);
            emit Transfer(to, address(0), _supply);
        } else if (newBalanceTo < 0) {
            uint256 _supply = uint256(newBalanceTo.sub(_balanceOf[to]));
            newSupply = newSupply.sub(_supply);
            emit Transfer(to, address(0), _supply);
        }
            
        _balanceOf[from] = newBalanceFrom;
        _balanceOf[to] = newBalanceTo;
        _totalSupply = newSupply;

        emit Transfer(from, to, value);
    }
    

    
}