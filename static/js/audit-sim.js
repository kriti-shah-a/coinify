/**
 * Financial Audit Simulation – DEI-focused chat scenarios
 * State: currentNodeId, score, confidence, checklistHit, transcript
 * Nodes: npcMessage, choices (label, userText, scoreDelta, confidenceDelta, unlockChecklistItem, nextNodeId)
 */
(function () {
  'use strict';

  var BADGES_KEY = 'coinify_audit_badges';
  var BASE_XP = 20;
  var MAX_XP = 50;

  var scenarios = {
    salary: {
      id: 'salary',
      name: 'Salary Negotiation',
      description: 'Offer call with recruiter/manager. Practice anchoring, asking for range, and negotiating respectfully.',
      xp: 25,
      checklistItems: [
        { id: 'ask_range', label: 'Ask for salary range or band' },
        { id: 'state_value', label: 'State your value or experience' },
        { id: 'ask_comp', label: 'Ask about total comp (benefits, equity)' },
        { id: 'request_adjustment', label: 'Request adjustment or time to consider' }
      ],
      startNodeId: 's1',
      nodes: {
        s1: {
          id: 's1',
          npcMessage: "Hi! We'd like to extend an offer. The base salary is $72,000. We don't typically negotiate—our offers are competitive. What do you think?",
          npcAudioText: "Hi! We'd like to extend an offer. The base salary is seventy-two thousand. We don't typically negotiate—our offers are competitive. What do you think?",
          choices: [
            { label: "I'd like to understand the full picture.", userText: "I'd like to understand the full picture before I respond. Could you share the salary range for this role and what's included in total comp—benefits, equity, bonus?", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'ask_range', nextNodeId: 's2' },
            { label: "That sounds fine, I accept.", userText: "That sounds fine, I accept.", scoreDelta: 0, confidenceDelta: -5, nextNodeId: 's_end_weak' },
            { label: "I need time to consider.", userText: "Thank you. I'd like a few days to consider. Can you share the full offer in writing, including benefits and any equity?", scoreDelta: 10, confidenceDelta: 5, unlockChecklistItem: 'ask_comp', nextNodeId: 's2' }
          ]
        },
        s2: {
          id: 's2',
          npcMessage: "Sure. The range for this level is $70K–$85K. We have health, 401(k) match, and 10 days PTO. No equity at this level. Is there something specific you'd like to discuss?",
          choices: [
            { label: "I'd like to request $80K given my experience.", userText: "Based on my experience and the value I'll bring, I'd like to request $80,000. I've led similar projects and have the certifications you need. Can we explore that?", scoreDelta: 20, confidenceDelta: 15, unlockChecklistItem: 'state_value', nextNodeId: 's3' },
            { label: "What's the top of the range?", userText: "What's the top of the range for this role? I want to make sure I'm aligned before I decide.", scoreDelta: 10, confidenceDelta: 5, unlockChecklistItem: 'ask_range', nextNodeId: 's3' },
            { label: "I'll take the original offer.", userText: "I'll take the original offer, thanks.", scoreDelta: 0, confidenceDelta: -5, nextNodeId: 's_end_ok' }
          ]
        },
        s3: {
          id: 's3',
          npcMessage: "I can take that back to the team. We might be able to do $78K—that's a stretch. Would that work? Or we could look at a sign-on or extra PTO instead.",
          choices: [
            { label: "I'd accept $78K with a written confirmation.", userText: "I'd accept $78,000 with written confirmation. Thank you for working with me on this.", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'request_adjustment', nextNodeId: 's_win' },
            { label: "Could we do $78K plus one extra week PTO?", userText: "Could we do $78K plus one extra week of PTO? That would help me with work-life balance.", scoreDelta: 18, confidenceDelta: 12, unlockChecklistItem: 'request_adjustment', nextNodeId: 's_win' },
            { label: "I need the full $80K to make it work.", userText: "I really need the full $80K to make this work. Is there any flexibility?", scoreDelta: 10, confidenceDelta: 5, nextNodeId: 's_win' }
          ]
        },
        s_win: {
          id: 's_win',
          npcMessage: "You did great. You asked for data, stated your value, and got an improved offer. That's exactly how you close the gap. 🪙",
          choices: [{ label: 'Finish', userText: 'Thanks!', scoreDelta: 5, confidenceDelta: 5, nextNodeId: 'end' }]
        },
        s_end_ok: {
          id: 's_end_ok',
          npcMessage: "No problem. You accepted—that's valid. Next time, remember: it's okay to ask for the range and total comp before deciding. You've got this!",
          choices: [{ label: 'Finish', userText: 'Got it.', scoreDelta: 0, confidenceDelta: 0, nextNodeId: 'end' }]
        },
        s_end_weak: {
          id: 's_end_weak',
          npcMessage: "Okay. Just so you know—many companies do have room to move. Asking for the range and stating your value usually helps. Don't sell yourself short!",
          choices: [{ label: 'Finish', userText: 'I understand.', scoreDelta: 0, confidenceDelta: 0, nextNodeId: 'end' }]
        }
      }
    },
    credit: {
      id: 'credit',
      name: 'Credit / Loan Call',
      description: 'Calling the bank about a personal or auto loan. Learn APR vs interest, fees, prepayment penalty, and credit pull type.',
      xp: 25,
      checklistItems: [
        { id: 'ask_apr', label: 'Ask for APR (not just interest rate)' },
        { id: 'ask_fees', label: 'Ask about all fees and closing costs' },
        { id: 'ask_prepayment', label: 'Ask about prepayment penalty' },
        { id: 'ask_credit_pull', label: 'Ask if it’s a soft or hard credit pull' }
      ],
      startNodeId: 'c1',
      nodes: {
        c1: {
          id: 'c1',
          npcMessage: "Thanks for calling. I see you're interested in a $10,000 personal loan. Our rate is 12% and we can get you approved today. Want to move forward?",
          choices: [
            { label: "What's the APR and total cost?", userText: "Can you tell me the APR—not just the interest rate—and the total cost including any fees?", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'ask_apr', nextNodeId: 'c2' },
            { label: "Yes, let's do it.", userText: "Yes, let's do it.", scoreDelta: 0, confidenceDelta: -5, nextNodeId: 'c_end_weak' },
            { label: "What fees are involved?", userText: "What fees are involved—origination, closing, anything else?", scoreDelta: 10, confidenceDelta: 5, unlockChecklistItem: 'ask_fees', nextNodeId: 'c2' }
          ]
        },
        c2: {
          id: 'c2',
          npcMessage: "The APR is 13.2% including a 2% origination fee. Term is 36 months. There's no prepayment penalty. We do a hard pull. Any other questions?",
          choices: [
            { label: "Is the credit check soft or hard?", userText: "You mentioned a pull—is that a soft or hard credit check? I want to know before it affects my score.", scoreDelta: 12, confidenceDelta: 8, unlockChecklistItem: 'ask_credit_pull', nextNodeId: 'c3' },
            { label: "Can I pay off early without penalty?", userText: "Can I pay off the loan early without a prepayment penalty?", scoreDelta: 10, confidenceDelta: 5, unlockChecklistItem: 'ask_prepayment', nextNodeId: 'c3' },
            { label: "I'll think about it.", userText: "I'll think about it and call back. Can you send the terms in writing?", scoreDelta: 8, confidenceDelta: 5, nextNodeId: 'c_win' }
          ]
        },
        c3: {
          id: 'c3',
          npcMessage: "It's a hard pull. And yes, no prepayment penalty—you can pay early. You're asking the right questions. Here's a summary in writing. Sound good?",
          choices: [
            { label: "Yes, I'd like to proceed with the terms in writing.", userText: "Yes, I'd like to proceed once I have the full terms in writing. Thank you.", scoreDelta: 15, confidenceDelta: 10, nextNodeId: 'c_win' },
            { label: "I'll compare with one more lender.", userText: "I'll compare with one more lender and get back to you. Thanks for the details.", scoreDelta: 10, confidenceDelta: 5, nextNodeId: 'c_win' }
          ]
        },
        c_win: {
          id: 'c_win',
          npcMessage: "You covered APR, fees, prepayment, and credit pull. You're in a strong position to avoid predatory terms. Well done! 🪙",
          choices: [{ label: 'Finish', userText: 'Thanks!', scoreDelta: 5, confidenceDelta: 5, nextNodeId: 'end' }]
        },
        c_end_weak: {
          id: 'c_end_weak',
          npcMessage: "No problem. For next time: always ask for APR, all fees, prepayment rules, and whether it's a soft or hard pull. You've got this!",
          choices: [{ label: 'Finish', userText: 'Got it.', scoreDelta: 0, confidenceDelta: 0, nextNodeId: 'end' }]
        }
      }
    },
    rent: {
      id: 'rent',
      name: 'Rent + Utilities Setup',
      description: 'Landlord and utilities: deposits, credit-check alternatives, documentation, and avoiding scams.',
      xp: 25,
      checklistItems: [
        { id: 'ask_deposit', label: 'Ask what the security deposit covers' },
        { id: 'credit_alt', label: 'Ask about alternatives if no credit history' },
        { id: 'get_writing', label: 'Get terms and receipts in writing' },
        { id: 'payment_schedule', label: 'Clarify payment schedule and due dates' }
      ],
      startNodeId: 'r1',
      nodes: {
        r1: {
          id: 'r1',
          npcMessage: "Hi, you're calling about the apartment? We need first month, last month, and security—all due before keys. We'll run a credit check. Can you send a money order today to hold it?",
          choices: [
            { label: "What does the security deposit cover?", userText: "Can you tell me what the security deposit covers and when I'd get it back? I'd also like the lease and payment terms in writing before sending any money.", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'ask_deposit', nextNodeId: 'r2' },
            { label: "I don't have credit history yet.", userText: "I'm new to the country and don't have a credit history yet. Do you accept alternatives like proof of income or a larger deposit?", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'credit_alt', nextNodeId: 'r2' },
            { label: "I'll send the money order.", userText: "I'll send the money order.", scoreDelta: -10, confidenceDelta: -10, nextNodeId: 'r_end_weak' }
          ]
        },
        r2: {
          id: 'r2',
          npcMessage: "Good questions. Security covers damages and is returned after move-out per the lease. We do accept proof of income and a co-signer if no credit. Everything will be in the lease. When is your move-in date?",
          choices: [
            { label: "When is rent due each month?", userText: "When is rent due each month and what's the payment schedule—same date every month?", scoreDelta: 12, confidenceDelta: 8, unlockChecklistItem: 'payment_schedule', nextNodeId: 'r3' },
            { label: "I need the lease and receipt in writing first.", userText: "I need the full lease and a receipt for any payment in writing before I send funds. Can you email that?", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'get_writing', nextNodeId: 'r3' }
          ]
        },
        r3: {
          id: 'r3',
          npcMessage: "Rent is due on the 1st. We'll send the lease and give you a receipt for every payment. You're doing the right thing by asking—avoids scams. Welcome! 🪙",
          choices: [{ label: 'Finish', userText: 'Thank you!', scoreDelta: 10, confidenceDelta: 10, nextNodeId: 'end' }]
        },
        r_end_weak: {
          id: 'r_end_weak',
          npcMessage: "Hold on—never send money before you have a signed lease and see the place. Scammers often ask for money orders upfront. Ask for everything in writing and visit in person. You've got this!",
          choices: [{ label: 'Finish', userText: 'I understand.', scoreDelta: 0, confidenceDelta: 0, nextNodeId: 'end' }]
        }
      }
    },
    medical: {
      id: 'medical',
      name: 'Medical Bill / Insurance Appeal',
      description: 'Calling billing: itemized bill, payment plan, charity care, and coding errors.',
      xp: 25,
      checklistItems: [
        { id: 'itemized', label: 'Request an itemized bill' },
        { id: 'payment_plan', label: 'Ask about payment plans or financial assistance' },
        { id: 'charity_care', label: 'Ask about charity care or sliding scale' },
        { id: 'coding_review', label: 'Ask for a coding/billing review for errors' }
      ],
      startNodeId: 'm1',
      nodes: {
        m1: {
          id: 'm1',
          npcMessage: "Your balance is $2,400. We need payment in full or a payment plan set up within 30 days. How would you like to pay?",
          choices: [
            { label: "I need an itemized bill first.", userText: "I'd like to request an itemized bill before I pay. I want to verify the charges and check for errors.", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'itemized', nextNodeId: 'm2' },
            { label: "I can't pay in full. What are my options?", userText: "I can't pay in full. What payment plans or financial assistance do you offer?", scoreDelta: 12, confidenceDelta: 8, unlockChecklistItem: 'payment_plan', nextNodeId: 'm2' },
            { label: "I'll pay in full.", userText: "I'll pay in full.", scoreDelta: 0, confidenceDelta: -5, nextNodeId: 'm_end_ok' }
          ]
        },
        m2: {
          id: 'm2',
          npcMessage: "We'll send an itemized bill. We have payment plans with no interest for 12 months, and we have charity care for qualifying patients. Would you like to apply for financial assistance?",
          choices: [
            { label: "Yes, how do I apply for charity care?", userText: "Yes. How do I apply for charity care or a sliding scale? What documentation do I need?", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'charity_care', nextNodeId: 'm3' },
            { label: "Can someone review the billing for errors?", userText: "Can someone review the billing and coding for errors before I set up a plan?", scoreDelta: 12, confidenceDelta: 8, unlockChecklistItem: 'coding_review', nextNodeId: 'm3' }
          ]
        },
        m3: {
          id: 'm3',
          npcMessage: "We'll send the financial assistance form and do a billing review. You'll get a letter with next steps. You did great—asking for itemized bills and assistance is exactly right. 🪙",
          choices: [{ label: 'Finish', userText: 'Thank you!', scoreDelta: 10, confidenceDelta: 10, nextNodeId: 'end' }]
        },
        m_end_ok: {
          id: 'm_end_ok',
          npcMessage: "Okay. For future reference: always ask for an itemized bill, payment plans, and charity care. Many bills have errors or can be reduced. You've got this!",
          choices: [{ label: 'Finish', userText: 'Got it.', scoreDelta: 0, confidenceDelta: 0, nextNodeId: 'end' }]
        }
      }
    },
    investment: {
      id: 'investment',
      name: 'Auntie vs Finfluencer',
      description: 'Friend pushing a risky “hot tip” vs building a safe plan. Diversification, emergency fund first, saying no.',
      xp: 25,
      checklistItems: [
        { id: 'emergency_first', label: 'Mention emergency fund first' },
        { id: 'diversify', label: 'Talk about diversification' },
        { id: 'say_no', label: "Politely decline or set a boundary" },
        { id: 'simple_plan', label: 'Suggest a simple, low-risk plan' }
      ],
      startNodeId: 'i1',
      nodes: {
        i1: {
          id: 'i1',
          npcMessage: "Hey! You have to get in on this crypto thing—my friend made 10x in a month. I'm putting in $5K. You in? It's a sure thing.",
          choices: [
            { label: "I'm focusing on an emergency fund first.", userText: "I'm focusing on building an emergency fund first before any risky investments. Once I have 3–6 months saved, I'll look at diversified options.", scoreDelta: 18, confidenceDelta: 12, unlockChecklistItem: 'emergency_first', nextNodeId: 'i2' },
            { label: "I'm not comfortable with that risk.", userText: "I'm not comfortable putting money in something that volatile. I'd rather stick to a simple plan—diversified index funds or a target-date fund.", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'say_no', nextNodeId: 'i2' },
            { label: "Okay, I'll put in $2K.", userText: "Okay, I'll put in $2K.", scoreDelta: -10, confidenceDelta: -10, nextNodeId: 'i_end_weak' }
          ]
        },
        i2: {
          id: 'i2',
          npcMessage: "Really? You're gonna miss out. Everyone's doing it. Why are you being so cautious?",
          choices: [
            { label: "Diversification beats one hot tip.", userText: "Diversification beats one hot tip. I'd rather spread risk across stocks and bonds and sleep well at night.", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'diversify', nextNodeId: 'i3' },
            { label: "I have a simple plan that works for me.", userText: "I have a simple plan that works for me—emergency fund, then low-cost index funds. I'm good, but thanks for thinking of me!", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'simple_plan', nextNodeId: 'i3' }
          ]
        },
        i3: {
          id: 'i3',
          npcMessage: "Fair enough. You stuck to your plan and didn't fall for FOMO. That's how you build wealth for real. Proud of you! 🪙",
          choices: [{ label: 'Finish', userText: 'Thanks!', scoreDelta: 10, confidenceDelta: 10, nextNodeId: 'end' }]
        },
        i_end_weak: {
          id: 'i_end_weak',
          npcMessage: "Just so you know—putting a lot into one risky thing is how people get hurt. Emergency fund first, then diversify. You've got this!",
          choices: [{ label: 'Finish', userText: 'I understand.', scoreDelta: 0, confidenceDelta: 0, nextNodeId: 'end' }]
        }
      }
    },
    boundary: {
      id: 'boundary',
      name: 'Workplace Boundary Setting',
      description: 'Being asked to do extra “office housework” or unpaid emotional labor. Assertiveness, redirecting, documenting.',
      xp: 25,
      checklistItems: [
        { id: 'acknowledge', label: 'Acknowledge the ask without agreeing' },
        { id: 'redirect', label: 'Redirect or suggest fair distribution' },
        { id: 'document', label: 'Document or clarify scope' },
        { id: 'propose_fair', label: 'Propose a fair rotation or process' }
      ],
      startNodeId: 'b1',
      nodes: {
        b1: {
          id: 'b1',
          npcMessage: "Hey, you're so good at organizing—can you take notes at the leadership meeting again and plan the team lunch? It'll only take a few hours. Everyone counts on you for this.",
          choices: [
            { label: "I can do it this time if we rotate going forward.", userText: "I can do it this time if we set up a rotation so everyone shares the load going forward. I'll send a quick proposal.", scoreDelta: 18, confidenceDelta: 12, unlockChecklistItem: 'propose_fair', nextNodeId: 'b2' },
            { label: "I'm at capacity. Can someone else take notes?", userText: "I'm at capacity this week. Can someone else take notes? We could rotate so it's fair.", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'redirect', nextNodeId: 'b2' },
            { label: "Sure, I'll do it.", userText: "Sure, I'll do it.", scoreDelta: 0, confidenceDelta: -5, nextNodeId: 'b_end_weak' }
          ]
        },
        b2: {
          id: 'b2',
          npcMessage: "Oh, we just thought you didn't mind. It's not a big deal—you're already going to the meeting. Can you just do it this once more?",
          choices: [
            { label: "I don't mind occasionally, but I need it documented.", userText: "I don't mind occasionally if it's documented as part of my role and workload. Can we add it to the meeting agenda so scope is clear?", scoreDelta: 12, confidenceDelta: 8, unlockChecklistItem: 'document', nextNodeId: 'b3' },
            { label: "I'd prefer we share this. I'll set up a rotation.", userText: "I'd prefer we share this so no one person carries it. I'll set up a simple rotation and send it to the team.", scoreDelta: 15, confidenceDelta: 10, unlockChecklistItem: 'propose_fair', nextNodeId: 'b3' }
          ]
        },
        b3: {
          id: 'b3',
          npcMessage: "That's fair. We'll try the rotation. You set a boundary and proposed something better. That's professional and respectful. Well done! 🪙",
          choices: [{ label: 'Finish', userText: 'Thanks!', scoreDelta: 10, confidenceDelta: 10, nextNodeId: 'end' }]
        },
        b_end_weak: {
          id: 'b_end_weak',
          npcMessage: "No problem. For next time: it's okay to say you're at capacity and suggest a rotation or documentation. You've got this!",
          choices: [{ label: 'Finish', userText: 'Got it.', scoreDelta: 0, confidenceDelta: 0, nextNodeId: 'end' }]
        }
      }
    }
  };

  function getScenario(id) {
    return scenarios[id] || null;
  }

  function getScenarioIds() {
    return Object.keys(scenarios);
  }

  function initState(scenarioId) {
    var scenario = getScenario(scenarioId);
    if (!scenario) return null;
    return {
      scenarioId: scenarioId,
      currentNodeId: scenario.startNodeId,
      score: 0,
      confidence: 50,
      checklistHit: {},
      transcript: [],
      turnCount: 0
    };
  }

  function getNode(scenarioId, nodeId) {
    var scenario = getScenario(scenarioId);
    if (!scenario || !scenario.nodes) return null;
    return scenario.nodes[nodeId] || null;
  }

  function advance(state, choiceIndex, typedText) {
    if (!state) return state;
    var node = getNode(state.scenarioId, state.currentNodeId);
    if (!node) return state;

    var newState = {
      scenarioId: state.scenarioId,
      currentNodeId: state.currentNodeId,
      score: state.score,
      confidence: state.confidence,
      checklistHit: Object.assign({}, state.checklistHit),
      transcript: state.transcript.slice(),
      turnCount: state.turnCount
    };

    var choice = null;
    if (typeof choiceIndex === 'number' && node.choices && node.choices[choiceIndex]) {
      choice = node.choices[choiceIndex];
      newState.transcript.push({ role: 'user', text: choice.userText });
      newState.score += choice.scoreDelta || 0;
      newState.confidence = Math.max(0, Math.min(100, newState.confidence + (choice.confidenceDelta || 0)));
      if (choice.unlockChecklistItem) newState.checklistHit[choice.unlockChecklistItem] = true;
      newState.currentNodeId = choice.nextNodeId || 'end';
    } else if (typedText && node.freeTextExpectedKeywords) {
      var text = (typedText || '').toLowerCase();
      var matched = node.freeTextExpectedKeywords.some(function (kw) { return text.indexOf(kw.toLowerCase()) !== -1; });
      newState.transcript.push({ role: 'user', text: typedText });
      if (matched) {
        newState.score += 10;
        newState.confidence = Math.min(100, newState.confidence + 5);
      }
      newState.currentNodeId = node.nextNodeIdAfterFreeText || 'end';
    }

    newState.turnCount++;
    return newState;
  }

  function isEnd(state) {
    if (!state || !state.currentNodeId) return true;
    if (state.currentNodeId === 'end') return true;
    var node = getNode(state.scenarioId, state.currentNodeId);
    return !node || (!node.choices && !node.freeTextExpectedKeywords);
  }

  function getChecklistProgress(state) {
    if (!state) return { hit: [], total: 0 };
    var scenario = getScenario(state.scenarioId);
    if (!scenario || !scenario.checklistItems) return { hit: [], total: 0 };
    var hit = scenario.checklistItems.filter(function (item) { return state.checklistHit[item.id]; });
    return { hit: hit, total: scenario.checklistItems.length };
  }

  function computeXP(state) {
    if (!state) return 0;
    var scenario = getScenario(state.scenarioId);
    if (!scenario) return 0;
    var base = scenario.xp || BASE_XP;
    var checklist = getChecklistProgress(state);
    var bonus = Math.floor((state.score / 50) * 15) + (checklist.hit.length * 3);
    return Math.min(MAX_XP, base + bonus);
  }

  function getAuditBadges() {
    try {
      var raw = localStorage.getItem(BADGES_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function setAuditBadge(scenarioId) {
    var badges = getAuditBadges();
    badges[scenarioId] = true;
    try {
      localStorage.setItem(BADGES_KEY, JSON.stringify(badges));
    } catch (e) {}
  }

  window.AuditSim = {
    getScenario: getScenario,
    getScenarioIds: getScenarioIds,
    initState: initState,
    getNode: getNode,
    advance: advance,
    isEnd: isEnd,
    getChecklistProgress: getChecklistProgress,
    computeXP: computeXP,
    getAuditBadges: getAuditBadges,
    setAuditBadge: setAuditBadge,
    scenarios: scenarios
  };
})();
