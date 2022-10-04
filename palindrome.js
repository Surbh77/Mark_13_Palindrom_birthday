const dateInput=document.querySelector('#bday-input');
const button=document.querySelector('#palin-btn');
const output1=document.querySelector('#output1');
const output2=document.querySelector('#output2');




button.addEventListener('click',clickHandler)

function clickHandler(e){
    var bdayStr=dateInput.value;

    // var output=getNextPalindromeDate(dateInput.value)

    if(bdayStr!==''){
        var listOfDate=bdayStr.split('-')
        var date={
            day:Number(listOfDate[2]),
            month:Number(listOfDate[1]),
            year:Number(listOfDate[0])}
    

        var checkpalindrom=checkPalindromeForAllDateFormats(date);
        if(checkpalindrom){
            output1.innerText='Yay! your birthday is a palindrome!!🥳🥳'
        }else{
            var [ctr1,nextDate,ctr2,prevDate]=getNextPalindromeDate(date);
            output1.innerText=`Stay tuned, the next paindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, it is ${ctr1} days away!😮🥳`
            output2.innerText=`The previous paindrome date was ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed it by  ${ctr2} days!😞😒`

        }
    }else{
        output1.innerText='Please enter your date of birth!!🤔🤔'
    }
}

function reverseString(str){
    var listOfChars=str.split('');
    var reverseListOfChars=listOfChars.reverse();
    var reversestr=reverseListOfChars.join('');
    return reversestr;
}

function isPalindrome(str){
    var reverse=reverseString(str);
    return str===reverse;
}

function convertDataToStr(date){
    var dateStr={day:'',month:'',year:''};
    if(date.day<10){
        dateStr.day='0'+date.day;
    }else{
        dateStr.day=date.day.toString();
    }
    if(date.month<10){
        dateStr.month='0'+date.month;
    }else{
        dateStr.month=date.month.toString();
    }
    dateStr.year=date.year.toString();
    return dateStr

}

function getAllDateFormats(date){
    var dateStr=convertDataToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day; 
    var ddmmyyy = dateStr.day + dateStr.month +  dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    return [ddmmyyyy,mmddyyy,yyyymmdd,ddmmyyy,mmddyy,yymmdd]  
}

function checkPalindromeForAllDateFormats(date){
    var listOfpalindromes=getAllDateFormats(date);

    var isPalin = false;

    for(var i=0;i<listOfpalindromes.length;i++){
        if(isPalindrome(listOfpalindromes[i])){
            isPalin=true;
            break;

        }
    }
    return isPalin;
}

function isLeapYear(year){
    if(year%400===0){
        return true;
    }
    if(year%100===0){
        return false;
    }
    if(year %4===0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day=date.day+1;
    var month =date.month;
    var year=date.year;


    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

    if(month===2){
        if(isLeapYear(year)){
            if(day>29){
                day=1;
                month++;
            }
        }else{
            if(day>28){
                day=1;
                month++;
            }

        }
    }else{
        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }
    }
    if(month>12){
        month=1;
        year++;
    }
    return {day:day,month:month,year:year};
}

function getPreviousDate(date){
    var day=date.day-1;
    var month =date.month;
    var year=date.year;


    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

    if(month===3){
        if(isLeapYear(year)){
            if(day<1){
                day=29;
                month--;
            }
        }else{
            if(day<1){
                day=28;
                month--;
            }

        }
    }else{
        if(day<1){
            day=daysInMonth[month-2];
            month--;
        }
    }
    if(month<1){
        day=31
        month=12;
        year--;
    }
    return {day:day,month:month,year:year};
}

function getNextPalindromeDate(date){
    var ctr1=0;
    var ctr2=0;
    var nextDate=getNextDate(date);
    var prevDate=getPreviousDate(date);

    while(1){
        ctr1++;
        var nextPal=checkPalindromeForAllDateFormats(nextDate);
        if(nextPal){
            break;
        }
        nextDate=getNextDate(nextDate);
    }

    while(1){
        ctr2++;
        var prevPal=checkPalindromeForAllDateFormats(prevDate);
        if(prevPal){
            break;
        }
        prevDate=getPreviousDate(prevDate);
    }

    return [ctr1,nextDate,ctr2,prevDate];
}



