from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/run/{attack_type}")
def run_attack(attack_type: str):
    logs = simulate_attack(attack_type)
    return {"log": logs}

# Simulated attacks - stub

def simulate_attack(attack_type):
    logs = [f"Running {attack_type} attack..."]
    if attack_type == "replay":
        logs += ["Digest already used.", "Replay attack detected.", "❌ Rejected"]
    elif attack_type == "sybil":
        logs += ["Spawning 1000 fake keys...", "Rate limit tripped.", "❌ Partial success"]
    elif attack_type == "memory":
        logs += ["Injecting synthetic memory..."]
        logs += ["Hash mismatch.", "❌ Rejected"]
    elif attack_type == "forged":
        logs += ["Forging signature...", "Signature invalid.", "❌ Rejected"]
    else:
        logs += ["Unknown attack"]
    return logs