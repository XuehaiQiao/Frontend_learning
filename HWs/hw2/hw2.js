// q1
function reverseNumber(num) {
    let res = 0;

    while(num != 0) {
        res = res * 10 + num % 10;
        num = Math.floor(num / 10);
    }
    
    return res
}

// q2
function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;

    while(left < right) {
        if(str[left] !== str[right]) return false;
        left++;
        right--;
    }

    return true;
}

// q3
function strCombinations(str) {
    let left = 0;
    let right = 1;

    let res = [];
    for(const left in str) {
        for(const right in str) {
            if(right >= left) {
                res.push(str.substring(left, right+1));
            }
        }
    }

    return res;
}

// q4
function sortString(str) {
    return str.split('').sort().join('');
}

// q5
function capitalizeWords(str) {
    const words = str.split(' ');
  
    for (const i in words) {
      const word = words[i];
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
      words[i] = capitalized;
    }
  
    return words.join(' ');
}

// q6
function longestWord(str) {
    const words = str.split(' ');
    return words.reduce((a,b) => {
        if(a.length >= b.length) return a;
        else return b;
    });
}
  
// q7
function countVowels(str) {
    const vowels = 'aeiou';
    let count = 0;
  
    for (let i = 0; i < str.length; i++) {
      const letter = str[i].toLowerCase();
      if (vowels.includes(letter)) {
        count++;
      }
    }
  
    return count;
}

// q8
function isPrime(n) {
    if (n < 2) {
      return false;
    }
    
    let  sq = Math.floor(n ** 0.5);

    for (let i = 2; i <= sq; i++) {
      if (n % i === 0) {
        return false;
      }
    }
  
    return true;
}

// q9
function myTypeOf(argument) {
    return typeof argument;
}

// q10
function createIdentityMatrix(size) {
    let matrix = [];

    for(let i = 0; i < size; i++) {
        let row = new Array(size).fill(0);
        row[i] = 1;
        matrix.push(row);
    }

    return matrix;
}

// q11
function findSecondLowestAndGreatest(arr) {
    arr.sort();
    
    return [arr[1], arr[arr.length - 2]];
}

// q12
function isPerfectNumber(num) {
    let sum = 0;
  
    for (let i = 1; i < num; i++) {
      if (num % i === 0) {
        sum += i;
      }
    }
  
    return sum === num;
}

// q13
function getFactors(num) {
    const factors = [];
  
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
  
    return factors;
}

// q14
function amountToCoins(amount, coins) {
    coins.sort((a,b) => b-a);
    const res = [];
  
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
  
      while (amount >= coin) {
        res.push(coin);
        amount -= coin;
      }
    }
  
    return res;
}

// q15
function exp(b, n) {
    return b ** n;
}
// q16
function extractUniqueChars(str) {
    const uniqueChars = [];
  
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
  
      if (!uniqueChars.includes(char)) {
        uniqueChars.push(char);
      }
    }
  
    return uniqueChars.join("");
}

// q17
function letterOccurrences(str) {
    res = {}

    for(const i in str) {
        if(str[i] in res) res[str[i]]++;
        else res[str[i]] = 1;
    }

    return res;
}

// q18
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
  
      if (arr[mid] === target) {
        return mid;
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  
    return -1;
}

// 19
function largerThans(arr, target) {
    let res = [];

    for(const i in arr) {
        if(arr[i] > target) res.push(arr[i]);
    }

    return res;
}

// 20
function generateRandomId(length, characters) {
    let res = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      res += characters[randomIndex];
    }
  
    return res;
}

// 21
function generateSubsets(arr, length) {
    if(arr.length <= length) {
        return [arr];
    }
    else {
        let res = []
        for(const i in arr) {
            let subArr = new Array(...arr);
            subArr.splice(i, 1);

            res.push(...generateSubsets(subArr, length));
        }
        return res;
    }
}

// 22
function countOccurrences(str, char) {
    let count = 0;
  
    for (let i = 0; i < str.length; i++) {
      if (str[i] === char) {
        count++;
      }
    }
  
    return count;
}

// 23
function firstNotRepeatedChar(str) {
    let count = letterOccurrences(str);

    for(let i = 0; i < str.length; i++) {
        if(count[str[i]] === 1) return str[i];
    }

    return null
}

// 24
function bubbleSort(arr) {
    const n = arr.length;
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] < arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  
    return arr;
}

// 25
function longestString(arr) {
    let longest = 0;
    let res = null;
    for(const i in arr) {
        if(longest < arr[i].length) {
            longest = arr[i].length;
            res = arr[i];
        }
    }

    return res;
}

// 26
function longestSubstringWithoutRepeatingCharacters(str) {
    let maxLength = 0;
    let start = 0;
    let charMap = new Map();
  
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
  
      if (charMap.has(char) && charMap.get(char) >= start) {
        start = charMap.get(char) + 1;
      }
  
      charMap.set(char, i);
      maxLength = Math.max(maxLength, i - start + 1);
    }
  
    return str.substr(start, maxLength);
}

// 27
function longestPalindromeSubString(str) {
    if(isPalindrome(str)) {
        return str
    }

    let left = longestPalindromeSubString(str.substring(0, str.length - 1));
    let right = longestPalindromeSubString(str.substring(1));

    return left.length > right.length? left : right;
}

// 28
function calculate(a, b, operation) {
    return operation(a, b);
}
  
function add(a, b) {
    return a + b;
}

// 29
function getFunctionName(func) {
    return func.name;
}

// test
// console.log('Test Cases: ')
// console.log('1', reverseNumber(32243));
// console.log('2', isPalindrome('doggod'));
// console.log('3', strCombinations('dog'));
// console.log('4', sortString('webmaster'));
// console.log('5', capitalizeWords('the quick brown fox'));
// console.log('6', longestWord('Web Development Tutorial'));
// console.log('7', countVowels('The quick brown fox'));
// console.log('8', isPrime(97));
// console.log('9', myTypeOf('abc'));
// console.log('10', createIdentityMatrix(5));

// console.log('11', findSecondLowestAndGreatest([1,4,2,5,3]));
// console.log('12', isPerfectNumber(8128));
// console.log('13', getFactors(28));
// console.log('14', amountToCoins(46, [25, 10, 5, 2, 1]));
// console.log('15', exp(2, 3));
// console.log('16', extractUniqueChars("thequickbrownfoxjumpsoverthelazydog"));
// console.log('17', letterOccurrences("thequickbrownfoxjumpsoverthelazydog"));
// console.log('18', binarySearch([1,2,3,4,5,6,7,8,9], 3));
// console.log('19', largerThans([1,2,3,4,5,6,7,8,9], 3));
// console.log('20', generateRandomId(6, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"));

// console.log('21', generateSubsets([1,2,3], 2));
// console.log('22', countOccurrences('microsoft.com', 'o'));
// console.log('23', firstNotRepeatedChar('abacddbec'));
// console.log('24', bubbleSort([12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]));
// console.log('25', longestString(["Australia", "Germany", "United States of America"]));
console.log('26', longestSubstringWithoutRepeatingCharacters('bighdogibhoivhdfoierwgf'));
console.log('27', longestPalindromeSubString('abacd'));
console.log('28', calculate(1,2,add));
console.log('29', );

