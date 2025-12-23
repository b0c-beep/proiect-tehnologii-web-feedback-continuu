import * as XLSX from 'xlsx';

const EMOJI_MAP = {
    smiley: '😊 Happy',
    frowny: '😔 Bored',
    surprised: '😲 Surprised',
    confused: '😕 Confused'
};

// Export feedback to Excel
export const exportToExcel = (stats, messages, feedbackList, activityTitle, startedAt) => {
    const wb = XLSX.utils.book_new();

    // Sheet 1: Feedback Summary
    const summaryData = [
        ['Feedback Type', 'Count'],
        ['😊 Happy', stats.smiley],
        ['😔 Bored', stats.frowny],
        ['😲 Surprised', stats.surprised],
        ['😵 Confused', stats.confused],
        ['', ''],
        ['Total', stats.total]
    ];

    // Create summary sheet
    const ws1 = XLSX.utils.aoa_to_sheet(summaryData);
    ws1['!cols'] = [{ wch: 20 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, ws1, 'Summary');

    // Sheet 2: Feedback List
    const feedbackData = [
        ['#', 'Feedback Type', 'Time']
    ];

    // Add feedback to sheet
    feedbackList.forEach((f, index) => {
        const time = new Date(f.createdAt);
        feedbackData.push([
            index + 1,
            EMOJI_MAP[f.type] || f.type,
            time.toLocaleString('ro-RO')
        ]);
    });

    // Create feedback list sheet
    const ws2 = XLSX.utils.aoa_to_sheet(feedbackData);
    ws2['!cols'] = [{ wch: 5 }, { wch: 18 }, { wch: 22 }];
    XLSX.utils.book_append_sheet(wb, ws2, 'Feedback List');

    // Sheet 3: Feedback Per Minute
    const startTime = startedAt ? new Date(startedAt).getTime() : null;

    // Sheet 3: Feedback Per Minute
    if (startTime && feedbackList.length > 0) {
        const minuteMap = {};

        // Add feedback to minute map
        feedbackList.forEach((f) => {
            const minutes = Math.floor((new Date(f.createdAt).getTime() - startTime) / 60000);
            if (minutes >= 0) {
                minuteMap[minutes] = (minuteMap[minutes] || 0) + 1;
            }
        });


        // Create feedback per minute sheet
        const maxMinute = Math.max(...Object.keys(minuteMap).map(Number));
        const timelineData = [['Minute', 'Feedback Count']];

        // Add feedback to sheet
        for (let i = 0; i <= maxMinute; i++) {
            timelineData.push([i, minuteMap[i] || 0]);
        }

        // Create feedback per minute sheet
        const ws3 = XLSX.utils.aoa_to_sheet(timelineData);
        ws3['!cols'] = [{ wch: 10 }, { wch: 15 }];
        XLSX.utils.book_append_sheet(wb, ws3, 'Per Minute');
    }

    // Sheet 4: Messages
    if (messages.length > 0) {
        const messagesData = [
            ['#', 'Message', 'Time']
        ];
        messages.forEach((m, index) => {
            messagesData.push([
                index + 1,
                m.text,
                new Date(m.createdAt).toLocaleString('ro-RO')
            ]);
        });

        // Create messages sheet
        const ws4 = XLSX.utils.aoa_to_sheet(messagesData);
        ws4['!cols'] = [{ wch: 5 }, { wch: 50 }, { wch: 22 }];
        XLSX.utils.book_append_sheet(wb, ws4, 'Messages');
    }

    // Download
    const safeName = activityTitle.replace(/[^a-zA-Z0-9]/g, '_');
    const date = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `${safeName}_${date}.xlsx`);
};
