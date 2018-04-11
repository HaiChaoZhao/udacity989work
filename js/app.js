/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
/*(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/!* STUDENT APPLICATION *!/
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());*/
var module={
  init:function () {
      if(!localStorage.attendance){
          this.modulecreat();
      }
  },
   modulecreat:function () {
       var attendance={
           cardDays:12,
           cardStudent:{
               "Slappy the Frog":[],
               "Lilly the Lizard":[],
               "Paulrus the Walrus":[],
               "Gregory the Goat":[],
               "Adam the Anaconda":[]
           }
       };
       console.log('创建考勤记录');
       function getRandom() {
           return (Math.random() >= 0.5);
       }
       $.each(attendance.cardStudent,function (key) {
           for(var i=0;i<attendance.cardDays;i++){
               this.push(getRandom());
           }
       });
       localStorage.attendance=JSON.stringify(attendance);
   }
    
};
var octopus={
    init:function () {
        module.init();
        tableView.init();
        this.addlistener();
    },
    getmodule:function () {
      return JSON.parse(localStorage.attendance);
    },
    getmoduleStudent:function () {
        return JSON.parse(localStorage.attendance).cardStudent;
    },
    getcolumn:function () {
        return JSON.parse(localStorage.attendance).cardDays;
    },
    savemodule:function (newModuleObj) {
        localStorage.attendance=JSON.stringify(newModuleObj);
    },
    addlistener:function () {
        var $allCheckboxes=$('tbody input');
        $allCheckboxes.on('click',function () {
            var currentSutdentRows=$(this).closest('tr.student'),
                newArray=[],module,
                studentName=currentSutdentRows.children('td.name-col').text(),
                dayChecks=currentSutdentRows.children('.attend-col').children('input');
            dayChecks.each(function (i) {
                newArray.push($(this).prop('checked'));

            });
            module=octopus.getmodule();
            module.cardStudent[studentName]=newArray;
            octopus.savemodule(module);
            tableView.render();
        });
    }
};
var tableView={
    init:function () {
        tableView.creattheadtr();
        tableView.creattbody();
        tableView.render();
    },
    creattheadtr:function () {
        var $thead=$('thead'),
            column=octopus.getcolumn();
        $thead.append('<th class="name-col">Student Name</th>');
        for(var i=1;i<=column;i++){
            $thead.append('<th>'+i+'</th>');
        }
        $thead.append('<th class="missed-col">Days Missed-col</th>');
    },
    creattbody:function () {
        var tbodyobj=octopus.getmoduleStudent(),
            $tr,
            column=octopus.getcolumn(),
            $tbody=$('tbody');
        for(var name in tbodyobj){
            $tr=$('<tr class="student"></tr>');
            $tr.append('<td class="name-col">'+name+'</td>');
            for (var i=1;i<=column;i++){
                $tr.append('<td class="attend-col"><input type="checkbox"></td>');
            }
            $tr.append('<td class="missed-col"></td>');
            $tbody.append($tr);
        }
    },
    render:function () {
        var student=octopus.getmoduleStudent();
        $.each(student,function (key,values) {
            var studentRow=$('tbody .name-col:contains("'+key+'")').parent('tr'),
                dayChecks=$(studentRow).children('td').children('input'),
                miscolumn=$(studentRow).find('td.missed-col'),
                missed=0;
            dayChecks.each(function (i) {
                $(this).prop('checked',values[i]);
            });
            values.forEach(function (value) {
                if(value==false)missed++;
            });
            miscolumn.text(missed);
        });
    }
};
$(function () {
  octopus.init();
});

