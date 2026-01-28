export default function TestAssets() {
    return (
        <div style={{ padding: 50, background: '#333' }}>
            <h1>Test Assets</h1>
            <div style={{ display: 'flex', gap: 20 }}>
                <div>
                    <p>Concierge</p>
                    <img src="/concierge_service.png" width="300" />
                </div>
                <div>
                    <p>Waste</p>
                    <img src="/waste_management.png" width="300" />
                </div>
                <div>
                    <p>Office</p>
                    <img src="/office_support.png" width="300" />
                </div>
            </div>
        </div>
    )
}
