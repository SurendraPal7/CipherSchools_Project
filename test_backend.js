async function testBackend() {
    try {
        console.log('1. Fetching Assignment List...');
        const listRes = await fetch('http://localhost:5000/api/assignments');
        if (!listRes.ok) throw new Error(`List failed: ${listRes.status}`);
        const assignments = await listRes.json();

        if (assignments.length === 0) {
            console.error('Error: No assignments found (Did you seed?)');
            return;
        }

        const summary = assignments[0];
        console.log(`   Found assignment summary: ${summary.title} (ID: ${summary._id})`);

        console.log('2. Fetching Full Assignment Details...');
        const detailRes = await fetch(`http://localhost:5000/api/assignments/${summary._id}`);
        if (!detailRes.ok) throw new Error(`Detail fetch failed: ${detailRes.status}`);
        const assignment = await detailRes.json();

        if (!assignment.sampleTables || assignment.sampleTables.length === 0) {
            console.error('Error: Assignment has no sample tables.');
            return;
        }

        console.log('3. Testing Execution Endpoint...');
        const query = `SELECT * FROM ${assignment.sampleTables[0].tableName}`;
        console.log(`   Query: ${query}`);

        const execRes = await fetch('http://localhost:5000/api/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                assignmentId: assignment._id
            })
        });

        const execData = await execRes.json();
        if (!execRes.ok) {
            console.error('Execution Failed:', execData);
        } else {
            console.log('   Result:', JSON.stringify(execData, null, 2));
            console.log('SUCCESS: Backend is working!');
        }

    } catch (err) {
        console.error('FAILURE:', err.message);
    }
}

testBackend();
